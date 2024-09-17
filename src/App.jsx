import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      setToken(localToken);
    }
  }, []);
  //
  return (
    <>
      <p>{token}</p>
      <h1>Library App</h1>
      <Navigations token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Books />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} token={token} />}
        />
        <Route
          path="/register"
          element={<Register setToken={setToken} token={token} />}
        />
        <Route path="/book/:id" element={<SingleBook token={token} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account token={token} />} />
        </Route>
        <Route path="*" element={<Books />} />
      </Routes>
    </>
  );
}

export default App;
