import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectedRoutes({ children }) {
  const { user, authReady } = useSelector((state) => state.user);

  if (!authReady) {
    return <div className="flex justify-center items-center h-screen">
      <span className="loader"></span>
    </div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
