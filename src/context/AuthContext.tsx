import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Auth } from "../firebase/config"; // Import Firebase Auth instance. Update the path as needed.
import { onAuthStateChanged, User } from "firebase/auth";

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null; // Current authenticated user or null if not logged in
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to update the user state
}

// Create the AuthContext with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component to provide authentication state to children components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the current authenticated user
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      // Update the user state whenever authentication state changes
      setUser(currentUser);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    // Provide the user and setUser function to the context consumers
    <AuthContext.Provider value={{ user, setUser }}>
      {children} {/* Render the children components within the provider */}
    </AuthContext.Provider>
  );
};
