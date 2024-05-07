import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BannerCard from "../home/BannerCard";

const Banner = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all the books from the server
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // Filter books based on the search term
      const matchingBooks = books.filter((book) =>
        book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(books);
      // Check if any matching book is found
      if (matchingBooks.length > 0) {
        // Navigate to the details page of the first matching book
        navigateToBook(matchingBooks[0]._id);
      } else {
        // Handle case when no matching book is found
        alert("No matching book found");
      }
    } else {
      // Handle case when search term is empty
      alert("Please enter a search term");
    }
  };

  // Function to navigate to a different route
  const navigateToBook = (bookId) => {
    // Construct the URL for the book route using the bookId
    const bookUrl = `/book/${bookId}`;

    // Navigate to the book route
    window.location.href = bookUrl;
  };

  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* left side  */}
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-5xl font-bold leading-snug text-black">
            Buy and Sell Your Books{" "}
            <span className="text-blue-700">for the Best Prices</span>
          </h2>
          <p className="md:w-4/5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            ad voluptates saepe iusto facilis doloribus alias maiores magnam!
            Nesciunt, expedita. Cum commodi dolores suscipit vero minima
            recusandae voluptates quidem non.
          </p>

          <div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search a book"
              className="py-2 px-2 rounded-s-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* right side  */}
        <div style={{ style: -1 }}>
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
