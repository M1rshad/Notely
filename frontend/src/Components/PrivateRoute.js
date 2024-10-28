import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UseAuth";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return isAuthenticated ? children : null; // Return null if not authenticated
};

export default PrivateRoute;
