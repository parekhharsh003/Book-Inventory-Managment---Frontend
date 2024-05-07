import React, { useContext } from "react";
import { AuthContext } from "../contects/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

function PrivateRoute({ children }) {
  // Correctly destructure children from props
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  if (user) {
    return children; // Render children when user is authenticated
  }

  // Redirect to login page if user is not authenticated
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
