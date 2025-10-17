import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./Login";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setLoggedIn(!!token);
    };
    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchCartCount();
    } else {
      setCartItemCount(0);
    }
  }, [loggedIn]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdate", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, []);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(`${apiUrl}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setCartItemCount(data.cart?.length || 0);
    } else { }
  }


  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);

    window.dispatchEvent(new Event("authChange"));

    alert("You have been logged out successfully!");

    window.location.href = "/";
  };


  return (
    <nav className="navbar navbar-light bg-light border border-primary fixed-top">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home</span>
        </Link>
        <div className="ml-auto d-flex">
          {loggedIn ? (
            <button
              type="btn"
              className="btn btn-danger me-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Login />
          )}
          {loggedIn ? (
            <Link to="/cart">
              <button
                type="btn"
                className="fa-solid fa-cart-shopping border border-primary btn-primary m-1 p-2 position-relative"
                style={{
                  color: "blue",
                  backgroundColor: "lightblue",
                  borderRadius: "22%",
                }}
              >
                {cartItemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>
            </Link>
          ) : (
            <Link to="/signup">
              <button type="btn" className="btn btn-primary m-1">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
