import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const SingleBook = () => {
  // Retrieve book details from useLoaderData hook
  const { _id, bookTitle, imageURL, bookDescription, authorName, category } =
    useLoaderData();

  const [selectedBooks, setSelectedBooks] = useState([]);
  useEffect(() => {
    // Save selectedBooks to local storage whenever it changes
    localStorage.setItem("searchedBook", JSON.stringify(selectedBooks));
  }, [selectedBooks]);

  // Function to handle adding book to cart
  const handleAddToCart = (bookId) => {
    // Add the book ID to the list of selected books
    setSelectedBooks([...selectedBooks, bookId]);
    // Show alert message
    window.alert("Book added to cart successfully!");
  };

  return (
    <div className="mt-20 px-4 lg:px-24">
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-20">
              <div className="h-[330px] rounded-lg  mb-10 ">
                <img
                  className=" mx-auto h-full object-cover"
                  src={imageURL}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button
                    className="w-full bg-blue-700 dark:bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-800 dark:hover:bg-blue-700"
                    onClick={() => handleAddToCart(_id)}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className=" text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {bookTitle}
              </h2>
              <br />
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Author:
                  </span>{" "}
                  {authorName}
                  <br />
                  <br />
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Category:
                  </span>{" "}
                  {category}
                </div>
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    RS 500
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    In Stock
                  </span>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {bookDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
