import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function applyMainStyle(page) {
    if (page === "/login" || page === "/register") {
        return "main--auth";
    }
}

export default function Main(props) {
    const { state, dispatch } = useContext(AppContext);
    const { page } = state;
    return <main className={`${applyMainStyle(page)}`}>{props.children}</main>;
}
