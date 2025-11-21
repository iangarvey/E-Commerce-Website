import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const Navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const response = await fetch(`${apiUrl}api/signup`, opts);
    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Sign Up failed");
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      dispatch({ type: 'login', payload: data.token });
      alert("Sign up successful! Happy shopping!");
      Navigate("/");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="container m-5 border border-5"
        style={{ maxWidth: "500px" }}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
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
          <div className="mb-3">
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
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            ></input>
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="text-center mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
