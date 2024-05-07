import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ModernCart = () => {
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch all the books from the server
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    // Get selected book IDs from local storage
    const selectedBookIds =
      JSON.parse(localStorage.getItem("selectedBooks")) || [];
    const searchedBookIds =
      JSON.parse(localStorage.getItem("searchedBook")) || [];

    // Combine ids from both variables and remove duplicates
    const allBookIds = [...selectedBookIds, ...searchedBookIds];
    const uniqueBookIds = [...new Set(allBookIds)];

    // Filter the fetched books based on selected book IDs
    const selectedBooks = books.filter((book) =>
      uniqueBookIds.includes(book._id)
    );

    // Modify cart items based on selected books
    const modifiedCartItems = selectedBooks.map((book) => ({
      id: book._id,
      name: book.bookTitle,
      quantity: 1, // Set default quantity
      price: 500, // Set default price
      imageUrl: book.imageURL,
    }));

    // Update cart items state
    setCartItems(modifiedCartItems);
  }, [books]);

  const removeItem = (id) => {
    // Remove item from cart items state
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    // Remove item from local storage
    const selectedBookIds =
      JSON.parse(localStorage.getItem("selectedBooks")) || [];
    const searchedBookIds =
      JSON.parse(localStorage.getItem("searchedBook")) || [];
    const allBookIds = [...selectedBookIds, ...searchedBookIds];
    const updatedBookIds = allBookIds.filter((bookId) => bookId !== id);

    localStorage.setItem("selectedBooks", JSON.stringify(updatedBookIds));
    localStorage.setItem("searchedBook", JSON.stringify(updatedBookIds));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity, price: newQuantity * 500 } // Assuming the initial price is 500
          : item
      )
    );
  };

  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://www.localhost:5000/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:5000/api/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      callback_url: "http://localhost:5000/api/paymentverification",
      prefill: {
        name: "Harsh Parekh",
        email: "Harsh.parekh@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#0058e6",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="container mx-auto mt-20">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          {cartItems.map((item) => (
            <div
              className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50"
              key={item.id}
            >
              <div className="md:w-4/12 2xl:w-1/4 w-full">
                <img
                  src={item.imageUrl}
                  alt="Product"
                  className="h-30 w-28 ml-15 center object-cover md:block hidden"
                />
              </div>
              <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                  {item.id}
                </p>
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-black leading-none text-gray-800">
                    {item.name}
                  </p>
                  <select
                    aria-label="Select quantity"
                    className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <div className="flex items-center">
                    <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                      Add to favorites
                    </p>
                    <p
                      className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </p>
                  </div>
                  <p className="text-base font-black mr-9 leading-none text-blue-700">
                    Rs.{item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <a
            href="/shop"
            className="flex font-semibold text-blue-700 text-sm mt-10"
          >
            <svg className="mr-2 w-4" viewBox="0 0 448 512">
              <path
                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
                fill="#2b6cb0"
              />
            </svg>
            <Link to="/shop">Continue Shopping</Link>
          </a>
        </div>
        <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cartItems.length}
            </span>
            <span className="font-semibold text-sm">Rs.{calculateTotal()}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - Rs.100</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>Rs.{calculateTotal()}</span>
            </div>
            <button
              className="bg-blue-700 font-semibold hover:bg-blue-500 py-3 text-sm text-white uppercase w-full"
              onClick={() => checkoutHandler(calculateTotal())}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCart;
