import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  userEmail: string | null;
  loginUser: (email: string) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType>({
  userEmail: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const loginUser = (email: string) => {
    localStorage.setItem("userEmail", email);
    setUserEmail(email);
  };

  const logoutUser = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
  };

  return (
    <UserContext.Provider value={{ userEmail, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
