import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./Login";


export const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const checkAuthStatus = () => {
			const token = localStorage.getItem("token");
			setLoggedIn(!!token);
		};
		checkAuthStatus();
		window.addEventListener('storage', checkAuthStatus);
		window.addEventListener('authChange', checkAuthStatus);

		return () => {
			window.removeEventListener('storage', checkAuthStatus);
			window.removeEventListener('authChange', checkAuthStatus);
		};
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setLoggedIn(false);

		// Notify other components of auth change
		window.dispatchEvent(new Event('authChange'));

		alert("You have been logged out successfully!");

		window.location.href = '/';

	};

	return (
		<nav className="navbar navbar-light bg-light border border-primary">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto d-flex">
					{loggedIn ? (
						<button type="btn" className="btn btn-danger" onClick={handleLogout}>
							Logout
						</button>
					) : (
						<Login />
					)}
					{loggedIn ? (
						<Link to="/cart">
							<button type="btn" className="btn btn-primary m-1">Cart</button>
						</Link>
					) : (
						<Link to="/signup">
							<button type="btn" className="btn btn-primary m-1">Sign Up</button>
						</Link>
					)}
					
				</div>
			</div>
		</nav>
	);
};