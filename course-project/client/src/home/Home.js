import { useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
export default function Home() {
    const { state, dispatch } = useContext(AppContext);
    useEffect(() => {
        dispatch({ type: "SET_PAGE", payload: "/" });
    }, []);
    return <div>Home</div>;
}
