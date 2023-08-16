import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <header>
            <h1>Social Media App</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/notification">Noti</Link>
                    </li>
                    <li>
                        <Link to="/message">Message</Link>
                    </li>
                    <li>
                        <Link to="/profile">Me</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
