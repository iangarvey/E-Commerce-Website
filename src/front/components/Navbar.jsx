import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const { dispatch, store } = useGlobalReducer();
  const loggedIn = store.isLoggedIn;

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
      const totalQuantity = data.cart?.reduce((total, item) => {
        return total + item.quantity;
      }, 0) || 0;
      dispatch({ type: 'update_cart_count', payload: totalQuantity });
    }
  };

  useEffect(() => {
    // when component mounts, if logged in fetch cart count
    if (store.isLoggedIn) fetchCartCount();
  }, [store.isLoggedIn]);

  useEffect(() => {
  if (store.showCartDropdown) {
    const timer = setTimeout(() => {
      dispatch({ type: 'close_cart_dropdown' });
    }, 4000);

    return () => clearTimeout(timer);
  }
}, [store.showCartDropdown, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: 'logout' });
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
            <div className="position-relative">
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
                  {store.cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {store.cartCount}
                    </span>
                  )}
                </button>
              </Link>

              {store.showCartDropdown && (
                <ul
                  className="dropdown-menu dropdown-menu-dark show position-absolute"
                  style={{
                    top: '100%',
                    right: '0',
                    zIndex: 1050,
                    marginTop: '5px'
                  }}
                >
                  <li className="px-3 py-2">
                    <h6 className="text-success mb-2">✓ Item Added!</h6>
                    <Link to="/cart">
                      <button className="btn btn-primary btn-sm w-100">
                        View Cart ({store.cartCount})
                      </button>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/signup">
              <button type="btn" className="btn btn-primary m-1">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div >
    </nav >
  );
};