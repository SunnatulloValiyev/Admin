import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children, user, loading }) {
  if (loading) {
    return <div>Loading...</div>; // Optional loading state while checking user auth
  }

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
