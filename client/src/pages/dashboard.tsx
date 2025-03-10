import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../context/auth/AuthContext";

function Dashboard() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handelLogout = () => {
    logOut();
    navigate("/");
  };
  return (
    <div className="w-screen min-h-screen max-w-screen flex justify-start items-start ">
      <aside className="min-h-screen w-[20%] bg-gray-100 p-4 flex flex-col justify-between items-start ">
        <ul className="w-full flex justify-between flex-col items-start gap-4">
          <li className="hover:bg-gray-400 w-full p-4 rounded-md">
            <a href="/">Home</a>
          </li>
          <li className="hover:bg-gray-200 w-full p-4 rounded-md">
            <a href="/dashboard/products">Products</a>
          </li>
          <li className="hover:bg-gray-200 w-full p-4 rounded-md">
            <a href="/dashboard/orders">Orders</a>
          </li>
          <li className="hover:bg-gray-200 w-full p-4 rounded-md">
            <a href="/dashboard/users">Users</a>
          </li>
        </ul>
        <button
          onClick={handelLogout}
          className="hover:bg-blue-700 duration-150 cursor-pointer w-full p-4 rounded-md bg-blue-500 text-white"
        >
          Logout
        </button>
      </aside>
      <main className="w-[80%] min-h-screen   p-4">
        <h1>Dashboard Admin</h1>
        {<Outlet />}
      </main>
    </div>
  );
}

export default Dashboard;
