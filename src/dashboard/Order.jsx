import React, { useState, useEffect } from "react";
import { Table, Dropdown } from "flowbite-react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch order data from your backend
    fetch("http://localhost:5000/payments")
      .then((res) => {
        // Check if response is not OK
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text || "Failed to fetch order data");
          });
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/update-order-status/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update the local orders state to reflect the changes
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
      });
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Orders</h2>

      {/* Table for order data */}
      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>Order ID</Table.HeadCell>
          <Table.HeadCell>Razorpay Id</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        {orders.map((order) => (
          <Table.Body key={order._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {order._id}
              </Table.Cell>
              <Table.Cell>{order.razorpay_payment_id}</Table.Cell>
              <Table.Cell>
                <Dropdown label="Change Status">
                  <Dropdown.Item
                    onClick={() => handleStatusChange(order._id, "Shipped")}
                  >
                    Shipped
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleStatusChange(order._id, "Delivered")}
                  >
                    Delivered
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default Order;
