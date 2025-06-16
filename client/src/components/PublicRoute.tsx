import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const email = localStorage.getItem("userEmail");

  if (email) return <Navigate to="/" />;

  return <>{children}</>;
};

export default PublicRoute;
