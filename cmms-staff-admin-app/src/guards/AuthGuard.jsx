import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) return <LoadingScreen />;

  if (!isAuthenticated) {
    if (location.pathname !== requestedLocation)
      setRequestedLocation(location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
