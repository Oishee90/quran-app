import { useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaCog } from "react-icons/fa";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { LuUsersRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let title = "Admin Dashboard";
  let icon = <HiOutlineShieldCheck />;

  if (pathname.startsWith("/user-management")) {
    title = "User Management";
    icon = <LuUsersRound />;
  } else if (pathname.startsWith("/settings")) {
    title = "Settings";
    icon = <IoSettingsOutline />;
  } else if (pathname === "/admin" || pathname === "/") {
    title = "Admin Dashboard";
    icon = <HiOutlineShieldCheck />;
  }
  // console.log(role, "role in header");
  return (
    <div className="flex items-center justify-between py-4 px-9 lg:px-9 lg:py-6 bg-[#f6fbff]  text-[#000000] poppins ">
      {/* Title */}

      <div>
        <div className="flex items-center gap-1 text-2xl text-gray-800">
          <span className="w-8 h-8">{icon}</span>
          <span className="text-2xl">{title}</span>
        </div>
      </div>

      {/* Profile Section based on role */}
      <div className="flex items-center gap-6 cursor-pointer">
        {/* Time + Date */}
        <div className="flex flex-col leading-tight text-right">
          <span className="text-sm font-medium text-[#000000]">Admin</span>
          <span className="text-xs text-[#000000] ">admin@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
