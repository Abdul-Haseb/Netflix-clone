import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserSignOut } from "../firebase/AuthService";

export default function Navbar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [logout, setLogout] = useState(false);

  if (!authContext) {
    console.error("AuthContext is null");
    return null; // Optionally render a fallback UI
  }

  const { user } = authContext;

  return (
    <div className="absolute top-0 left-0 z-30 flex items-center justify-between py-4 px-4 md:py-6 md:px-8 w-full">
      <p
        onClick={() => navigate("/")}
        className="text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold text-red-600 cursor-pointer"
      >
        NETFLIX
      </p>
      <div className="flex items-center gap-2 md:gap-3">
        {user ? (
          <div>
            <button
              onClick={() => setLogout(!logout)} // Update to appropriate action
              className="py-1 block md:py-1.5 text-sm md:text-base px-3 md:px-4 rounded-md hover:text-red-600 transition-colors ease-in duration-200 scale-105"
            >
              {user.email} {/* Or user.displayName if available */}
            </button>
            {logout && (
              <button
                className="py-1 block md:py-1.5 text-sm md:text-base px-3 md:px-4 rounded-md hover:text-red-600 transition-colors ease-in duration-200 scale-105"
                onClick={() => UserSignOut()}
              >
                Logout
              </button>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/Login")}
              className="py-1 md:py-1.5 text-sm md:text-base px-3 md:px-4 rounded-md hover:text-red-600 transition-colors ease-in duration-200 scale-105"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/Signup")}
              className="border py-1 text-sm md:text-base md:py-1.5 px-3 md:px-4 rounded-md bg-red-600 transition-colors ease-in duration-200 border-red-600 hover:bg-transparent hover:border-white"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}
