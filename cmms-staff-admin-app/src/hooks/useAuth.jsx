import { useContext } from "react";
import { AuthContext } from "../contexts/JWTContexts";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth context must be use within AuthProvider");

  return context;
};

export default useAuth;
