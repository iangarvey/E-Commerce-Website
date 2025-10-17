import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./Login";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    console.log("Fetching cart count...");

    const response = await fetch(`${apiUrl}api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Cart data:", data);
      console.log("Cart count:", data.cart?.length || 0);
      setCartItemCount(data.cart?.length || 0);
    }
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const isLoggedIn = !!token;
      setLoggedIn(isLoggedIn);
      
      // Fetch cart count when logged in
      if (isLoggedIn) {
        fetchCartCount();
      } else {
        setCartItemCount(0);
      }
    };

    const handleCartUpdate = () => {
      console.log("cartUpdate event received!");
      fetchCartCount();
    };

    // Initial check
    checkAuthStatus();

    // Set up listeners
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("authChange", checkAuthStatus);
    window.addEventListener("cartUpdate", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, []);

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