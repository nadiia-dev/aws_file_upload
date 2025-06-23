import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { userEmail } = useUser();

  if (userEmail) return <Navigate to="/" />;

  return <>{children}</>;
};

export default PublicRoute;
