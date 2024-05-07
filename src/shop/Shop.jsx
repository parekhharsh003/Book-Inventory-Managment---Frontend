import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    // Save selectedBooks to local storage whenever it changes
    localStorage.setItem("selectedBooks", JSON.stringify(selectedBooks));
  }, [selectedBooks]);

  // Function to handle adding book to cart
  const handleAddToCart = (bookId) => {
    // Add the book ID to the list of selected books
    setSelectedBooks([...selectedBooks, bookId]);
    // Show alert message
    window.alert("Book added to cart successfully!");
  };

  return (
    <div className="mt-28 px-4 lg:px24">
      <h2 className="text-5xl font-bold text-center">All Books are here</h2>

      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {books.map((book) => (
          <Card key={book._id}>
            <img src={book.imageURL} alt="" className="h-96" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>{book.bookTitle}</p>
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <p>
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </p>

            {/* Button to add the book to the cart */}
            <button
              className="bg-blue-700 font-semibold text-white py-2 rounded"
              onClick={() => handleAddToCart(book._id)}
            >
              Add to Cart
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
