import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  // console.log(book);
  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <h2>{book.title}</h2>
      <img src={book.coverimage} alt={book.title} />
    </Link>
  );
}

export default BookCard;
