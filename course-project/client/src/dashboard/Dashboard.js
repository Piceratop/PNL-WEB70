import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

export default function Dashboard() {
    const { state, dispatch } = useContext(AppContext);
    const { page } = state;
    useEffect(() => {
        dispatch({ type: "SET_PAGE", payload: "/dashboard" });
    }, []);
    return <div>Dashboard</div>;
}
