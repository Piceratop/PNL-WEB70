import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    const { page } = state;
    return (
        <header>
            <Link className="app--name" to="/">
                <img src="/logo.png"></img>
            </Link>
            <nav>
                {page !== "/login" && (
                    <Link
                        to="/login"
                        className="button"
                        style={{
                            color: "var(--main-color)",
                            backgroundColor: "var(--main-color-light)",
                        }}
                    >
                        Login
                    </Link>
                )}
                {page !== "/register" && (
                    <Link
                        to="/register"
                        className="button"
                        style={{
                            backgroundColor: "var(--main-color)",
                            color: "white",
                        }}
                    >
                        Register
                    </Link>
                )}
            </nav>
        </header>
    );
}
