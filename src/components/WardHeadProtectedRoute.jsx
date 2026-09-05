import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function WardHeadProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/ward-head/auth/me`, {
          withCredentials: true,
        });

        console.log("Auth check success:", response.data);

        setIsAuthenticated(true);
      } catch (error) {
        console.error(
          "Authentication failed:",
          error.response?.status,
          error.response?.data
        );

        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default WardHeadProtectedRoute;
