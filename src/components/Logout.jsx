import React from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contects/AuthProvider";

const Logout = () => {
  const { logOut } = useContext(AuthContext); // Move useContext to the top level
  const location = useLocation(); // Move useLocation to the top level
  const navigate = useNavigate(); // Move useNavigate to the top level

  const handleLogout = () => {
    const from = location.state?.from?.pathname || "/";

    logOut()
      .then(() => {
        //Sign-out successful.
        alert("Sign-out successful!!!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        //An error happened.
      });
  };

  return (
    <div className="h-screen bg-teal-100 flex items-center justify-center">
      <button
        className="bg-red-700 px-8 py-2 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
