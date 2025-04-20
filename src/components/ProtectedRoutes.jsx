import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes({ children }) {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;