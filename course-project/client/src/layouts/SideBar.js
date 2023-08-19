import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div>
            <h1>Quiz App</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/admin">Explore</Link>
            </nav>
        </div>
    );
}
