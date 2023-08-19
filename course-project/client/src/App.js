import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./contexts/AppContext";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Login from "./auths/Login";
import Register from "./auths/Register";
import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";

function applyAppStyle(page) {
    if (page === "/login" || page === "/register") {
        return "app--auth";
    }
    return "";
}

export default function App() {
    const { state, dispatch } = useContext(AppContext);
    const { page } = state;

    return (
        <div className={`App ${applyAppStyle(page)}`}>
            <Header />
            <Main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </Main>
        </div>
    );
}
