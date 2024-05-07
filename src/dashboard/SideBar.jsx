import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

import userImg from "../assets/profiles.png";
import { useContext } from "react";
import { AuthContext } from "../contects/AuthProvider";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  // Handling potential issue with user photo URL
  const userPhotoURL = user?.photoURL || userImg;
  const userName = user?.displayName || "Demo User";

  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="sticky top-0 h-screen"
    >
      <Sidebar.Logo
        href="/"
        img={userPhotoURL}
        imgAlt="User profile image"
        className="w-16 h-16"
      >
        <p>{userName}</p>
      </Sidebar.Logo>

      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="/admin/dashboard/upload"
            icon={HiOutlineCloudUpload}
          >
            Upload Book
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
            Manage Books
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/user" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/order" icon={HiShoppingBag}>
            Oders
          </Sidebar.Item>
          <Sidebar.Item href="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
