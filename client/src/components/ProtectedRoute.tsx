import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userEmail } = useUser();

  if (!userEmail) return <Navigate to="/register" />;

  return <>{children}</>;
};

export default ProtectedRoute;
