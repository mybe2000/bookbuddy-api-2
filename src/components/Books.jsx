import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCardList from "./BookCardList";

function Books() {
  const [books, setBooks] = useState([]);
  const [booksToShow, setBooksToShow] = useState([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_BASE_URL}/api/books`)
      .then((data) => {
        console.log(data.data);
        setBooks(data.data);
        setBooksToShow(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBookSearch = (e) => {
    const searchResults = books.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBooksToShow(searchResults);
  };

  return (
    <div className="bookspage">
      <div>
        Search for a book
        <input type="text" onChange={handleBookSearch} />
      </div>
      <BookCardList books={booksToShow} />
    </div>
  );
}

export default Books;
