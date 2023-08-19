import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api/v1",
    headers: {
        common: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    },
});

export default api;
