import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const email = useUser();

  if (!email) return <Navigate to="/register" />;

  return <>{children}</>;
};

export default ProtectedRoute;
