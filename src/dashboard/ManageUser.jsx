import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching user data...");
    fetch("http://localhost:5000/users")
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text || "Failed to fetch user data");
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    console.log("Deleting user:", id);
    fetch(`http://localhost:5000/delete-user/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log("Delete response status:", res.status);
        if (!res.ok) {
          throw new Error("Failed to delete user");
        }
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        window.alert("User deleted successfully");
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setError(err.message);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Users</h2>
      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>UserName</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
        </Table.Head>
        {users.map((user, index) => (
          <Table.Body className="divide-y" key={user.id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              {/* <Table.Cell>{user.password}</Table.Cell> */}
              <Table.Cell>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default ManageUser;
