import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import Blog from "../components/Blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBook from "../dashboard/EditBook";
import Signup from "../components/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Cart from "../components/Cart";
import ManageUser from "../dashboard/ManageUser";
import PaymentSuccess from "../components/PaymentSuccess";
import Order from "../dashboard/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/paymentsuccess",
        element: <PaymentSuccess />,
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />,
      },
      {
        path: "/admin/dashboard/user",
        element: <ManageUser />,
      },
      {
        path: "/admin/dashboard/order",
        element: <Order />,
      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBook />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
      },
    ],
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
]);

export default router;
