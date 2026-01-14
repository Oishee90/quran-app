import { useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaCog } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let title = "Admin Dashboard";
  let icon = <MdDashboard />;

  if (pathname.startsWith("/user-management")) {
    title = "User Management";
    icon = <FaUsers />;
  } else if (pathname.startsWith("/settings")) {
    title = "Settings";
    icon = <FaCog />;
  } else if (pathname === "/admin" || pathname === "/") {
    title = "Admin Dashboard";
    icon = <MdDashboard />;
  }

  return (
    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
      <span className="text-xl">{icon}</span>
      <span>{title}</span>
    </div>
  );
};

export default Header;
