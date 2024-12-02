import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" />;
  return <>{children}</>;
};

export default GuestGuard;
