import React from "react";
import { Link } from "react-router-dom";

function Navigations({ token, setToken }) {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <nav>
      <Link to="/">See all books</Link>
      {token && <Link to="/account">My Account</Link>}
      {token ? (
        <button onClick={handleLogOut}>Log out</button>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </nav>
  );
}

export default Navigations;
