import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const OtherBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(3, 8)));
  }, []);
  return (
    <div>
      <BookCard books={books} headline="Other Books" />
    </div>
  );
};

export default OtherBook;
