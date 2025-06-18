import { createContext, use } from "react";

const UserContext = createContext<string | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userEmail = localStorage.getItem("userEmail");
  return <UserContext value={userEmail}>{children}</UserContext>;
};

export const useUser = () => use(UserContext);
