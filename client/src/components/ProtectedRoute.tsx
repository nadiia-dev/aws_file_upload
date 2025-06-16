import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const email = localStorage.getItem("userEmail");

  if (!email) return <Navigate to="/register" />;

  return <>{children}</>;
};

export default ProtectedRoute;
