import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import api from "../api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: "SET_PAGE", payload: "/login" });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValidUsername = username.length >= 3;
        if (!isValidUsername) {
            setError("Invalid username or email.");
            return;
        }
        const isValidPassword = password.length >= 8;
        if (!isValidPassword) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        try {
            const response = await api.post("/auth/login", {
                username: username,
                password: password,
            });
            setError("");
            localStorage.setItem("token", response.data.token);
            dispatch({ type: "SET_USER", payload: response.data.token });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data.error;
                setError(responseData);
                return;
            }
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <form className="auth--form" onSubmit={handleSubmit}>
            <input
                className="input"
                type="text"
                id="username"
                value={username}
                placeholder="Username ..."
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="input"
                type="password"
                id="password"
                value={password}
                placeholder="Password ..."
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="auth--error">{error}</p>}

            <button className="button" type="submit" onClick={handleSubmit}>
                Login
            </button>

            <Link to="/register" style={{ color: "#5268cf" }}>
                Register Now
            </Link>
        </form>
    );
}
