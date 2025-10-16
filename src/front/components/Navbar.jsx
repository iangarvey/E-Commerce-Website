import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./Login";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);

    // Notify other components of auth change
    window.dispatchEvent(new Event("authChange"));

    alert("You have been logged out successfully!");

    window.location.href = "/";
  };

  const handleGetCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view your cart.");
      return;
    }

    const response = await fetch(`${apiUrl}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Cart data:", data);
    } else {
      alert("Failed to fetch cart data. Please try again.");
    }
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
                className="fa-solid fa-cart-shopping border border-primary btn-primary m-1 p-2"
                style={{
                  color: "blue",
                  backgroundColor: "lightblue",
                  borderRadius: "22%",
                }}
                onClick={handleGetCart}
              ></button>
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
