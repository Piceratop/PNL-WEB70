import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
export default function Home() {
    const { state, dispatch } = useContext(AppContext);
    const { userToken } = state;
    const navigate = useNavigate();
    if (userToken) {
        navigate("/dashboard");
    }
    useEffect(() => {
        dispatch({ type: "SET_PAGE", payload: "/" });
    }, []);
    return <div>Home</div>;
}
