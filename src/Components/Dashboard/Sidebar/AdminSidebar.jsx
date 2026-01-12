import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { userLoggedOut } from "../../../Redux/feature/auth/authSlice";
import { persistor } from "../../../Redux/store";
import { useDispatch } from "react-redux";
const AdminSidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isActive = (path) => location.pathname === path;

  const menuItem = (to, icon, label, active) => (
    <NavLink to={to}>
      <div className="flex justify-center mb-3 poppins">
        <div
          className={`flex items-center gap-3 px-5 transition-all
          ${
            collapsed
              ? "w-[60px] h-[42px] justify-center"
              : "w-[210px] h-[46px]"
          }
          rounded-full 
          ${
            active
              ? "bg-white border border-[#4F6BFF] text-[#000000]"
              : "text-[#000000] hover:bg-white/60"
          }`}
        >
          {icon}
          {!collapsed && <span className="text-lg">{label}</span>}
        </div>
      </div>
    </NavLink>
  );

  const handleLogout = () => {
    // Clear user data from localStorage
    dispatch(userLoggedOut());
    persistor.purge();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between  bg-gradient-to-r from-[#9EA3FE] via-[#E6E7F8] via-[59%] to-[#FFFFFF] outfit">
      {/* Logo */}
      <div>
        <Link to="/">
          <div className="flex justify-center py-6">
            <img src={logo} alt="Logo" className="w-[50px] " />
          </div>
        </Link>

        {/* Menu */}
        <nav className="mt-4">
          {menuItem(
            "/",
            <MdOutlineDashboard className="w-[18px] h-[18px]" />,
            "Dashboard",
            isActive("/")
          )}

          {menuItem(
            "/user-management",
            <FaRegUser className="w-[18px] h-[18px]" />,
            "User",
            location.pathname.startsWith("/user-management")
          )}

          {menuItem(
            "/settings",
            <FiSettings className="w-[18px] h-[18px]" />,
            "Settings",
            location.pathname.startsWith("/settings")
          )}
        </nav>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="mx-auto mb-8 flex items-center gap-2 px-5 h-[42px]
        rounded-full bg-white text-red-500 text-sm cursor-pointer
        hover:bg-red-50 transition"
      >
        <FaSignOutAlt />
        {!collapsed && <span>Logout</span>}
      </div>
    </div>
  );
};

export default AdminSidebar;
