import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    const { page, userToken } = state;

    return (
        <header>
            <h1>
                <Link to="/">Social Media App</Link>
            </h1>
            <nav>
                {!userToken && page !== "/login" && (
                    <Link to="/login" className="button">
                        Login
                    </Link>
                )}
                {!userToken && page !== "/register" && (
                    <Link to="/register" className="button">
                        Register
                    </Link>
                )}
            </nav>
        </header>
    );
}
