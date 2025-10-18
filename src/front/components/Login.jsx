import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            return;
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const opts = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }

        const response = await fetch(
            `${apiUrl}api/login`,
            opts
        );

        const data = await response.json();
        console.log("here's your data", data)

        if (!response.ok) {
            alert(data.error || "Login failed");
            return;
        }

        if (data.token) {
            localStorage.setItem("token", data.token);
            setLoggedIn(true);
            // Notify navbar and other components of auth change
            window.dispatchEvent(new Event('authChange'));
            // Close the modal using state instead of Bootstrap API
            setShowModal(false); 
            navigate("/");
        }
    }

    return (
        <div>
            {/* Button trigger modal - use onClick instead of data-bs-toggle */}
            <button 
                type="button" 
                className="btn btn-primary m-1" 
                onClick={() => setShowModal(true)} 
            >
                Login
            </button>

            {/* Modal - conditionally render based on state */}
            {showModal && ( 
                <div 
                    className="modal show d-block" 
                    style={{backgroundColor: 'rgba(0,0,0,0.5)'}} 
                    tabIndex="-1" 
                    aria-labelledby="exampleModalLabel" 
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Login to Your Account</h1>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowModal(false)} 
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                {(token && token != "" && token != undefined) ? (
                                    "You are logged in with this token " + token
                                ) : (
                                    <>
                                        <div className="email mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            ></input>
                                            <div id="emailHelp" className="form-text">
                                                We'll never share your email with anyone else.
                                            </div>
                                        </div>
                                        <div className="password mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                            ></input>
                                        </div>
                                        <div className="modal-footer">
                                            <button 
                                                type="button" 
                                                className="btn btn-secondary" 
                                                onClick={() => setShowModal(false)} 
                                            >
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={handleLogin}>
                                                Login
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}