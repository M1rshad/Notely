import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UseAuth";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Loader />
            </div>
        );
        
    }

    return isAuthenticated ? children : null; // Return null if not authenticated
};

export default PrivateRoute;
