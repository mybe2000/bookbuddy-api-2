

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios(`${import.meta.env.VITE_BASE_URL}/api/books/${id}`)
      .then((data) => {
        console.log(data.data.book);
        setBook(data.data.book);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckOut = async () => {
    try {
      const data = await axios
        .patch(
          `${import.meta.env.VITE_BASE_URL}/api/books/${id}`,
          { available: false },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          console.log(data);
          if (data.data.book) {
            setBook(data.data.book);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlebook">
      <h2>{book?.title}</h2>
      <img src={book?.coverimage} />
      <p>{book?.description}</p>
      <p>
        {!token && <Link to="/login">Log in to check out this book</Link>}
        {token && book?.available ? (
          <button onClick={handleCheckOut}>Check out this book</button>
        ) : (
          <p>Currently checked out</p>
        )}
      </p>
    </div>
  );
}

export default SingleBook;
