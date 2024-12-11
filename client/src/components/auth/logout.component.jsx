import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
            navigate("/signin");
        }
    }, [navigate]);

    return <Navigate to="/signin" />;
}
