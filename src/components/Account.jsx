import React, { useEffect, useState } from "react";
import axios from "axios";

function Account({ token }) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((result) => {
        console.log(result.data);
        setUser(result.data);
        setBooks(result.data.books);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const handleReturn = async (id) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/reservations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.deletedReservation) {
        const bookData = await axios(
          `${import.meta.env.VITE_BASE_URL}/api/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBooks(bookData.data.books);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>My Account</h2>
      <p>{user?.firstname}</p>
      <p>{user?.lastname}</p>
      <p>{user?.email}</p>
      <p>Books currently checked out:</p>
      {books.map((book) => (
        <div key={book.title}>
          <h2>{book.title}</h2>
          <button
            onClick={() => {
              handleReturn(book.id);
            }}
          >
            Return this book
          </button>
        </div>
      ))}
    </div>
  );
}

export default Account;
