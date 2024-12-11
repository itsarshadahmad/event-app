import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function DeleteEvent() {
    const { id } = useParams("id");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    if (!token) {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/event/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return <Navigate to="/" />;
}
