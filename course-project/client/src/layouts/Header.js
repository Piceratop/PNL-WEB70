import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    const { page, isAuth } = state;

    return (
        <header>
            <h1>
                <Link to="/">Social Media App</Link>
            </h1>
            <nav>
                {!isAuth && page !== "/login" && (
                    <Link to="/login" className="button">
                        Login
                    </Link>
                )}
                {!isAuth && page !== "/register" && (
                    <Link to="/register" className="button">
                        Register
                    </Link>
                )}
                {isAuth && (
                    <>
                        <button
                            className="button"
                            onClick={() => {
                                delete localStorage.token;
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}
