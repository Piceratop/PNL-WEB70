import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import api from "../api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: "SET_PAGE", payload: "/register" });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValidUsername = username.length >= 3;
        if (!isValidUsername) {
            setError("Username must be at least 3 characters long.");
            return;
        }
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            setError("Invalid email address.");
            return;
        }
        const isValidPassword = password.length >= 8;
        if (!isValidPassword) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        try {
            const response = await api.post("/auth/register", {
                username: username,
                email: email,
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
            <label htmlFor="username">Username:</label>
            <input
                className="input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
                className="input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
                className="input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="auth--error">{error}</p>}

            <button
                className="button"
                style={{ backgroundColor: "var(--main-color)", color: "white" }}
                type="submit"
                onClick={handleSubmit}
            >
                Register
            </button>

            <span style={{ margin: "1rem 0" }}>
                Have an account?{" "}
                <Link
                    className="button"
                    style={{
                        color: "var(--main-color)",
                        backgroundColor: "var(--main-color-light)",
                    }}
                    to="/login"
                >
                    Login
                </Link>
            </span>
        </form>
    );
}
