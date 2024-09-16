import React from "react";
import { Link } from "react-router-dom";

function Navigations({ token, setToken }) {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="navigations">
      <Link to="/">See all books</Link>
      {token ? (
        <div>
          <button onClick={handleLogOut}>Log out</button>
          <Link to="/account">Account</Link>
        </div>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </div>
  );
}

export default Navigations;
