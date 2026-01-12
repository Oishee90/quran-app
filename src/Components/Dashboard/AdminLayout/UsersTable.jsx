/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import { MdBlockFlipped } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import {
  useDeleteUserMutation,
  useGetDasboardQuery,
  useUpdateUserStatusMutation,
} from "../../../Redux/feature/auth/authapi";
import { RiDeleteBin6Line } from "react-icons/ri";
const UsersTable = ({ users, search, setSearch }) => {
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data, isLoading, refetch } = useGetDasboardQuery();
  //  Block / Unblock handler
  const handleBlockUser = async (user) => {
    const isBlocking = user.status === "Active";

    const result = await Swal.fire({
      title: isBlocking ? "Block User?" : "Unblock User?",
      text: isBlocking
        ? "Are you sure you want to block this user?"
        : "Are you sure you want to activate this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocking ? "#d33" : "#33c426",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    try {
      await updateUserStatus({
        email: user.email,
        is_blocked: isBlocking,
      }).unwrap();
      refetch();
      Swal.fire({
        icon: "success",
        title: isBlocking ? "User Blocked" : "User Activated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: "Something went wrong",
      });
    }
  };
  const handleDeleteUser = async (user) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteUser({ email: user.email }).unwrap();
      refetch();

      Swal.fire({
        icon: "success",
        title: "User Deleted",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong",
      });
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-xl poppins">
      {/* 🔍 Search */}
      <div className="py-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email or name"
          className="w-full px-4 py-2 border outline-none rounded-xl"
        />
      </div>

      {/* 📋 Table */}
      <div className="border rounded-xl">
        <table className="w-full bg-[#f5f5f5]">
          <thead>
            <tr>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">Email</th>
              <th className="px-4 py-4 text-left">Registration Date</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-6">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.date}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        user.status === "Active"
                          ? "bg-[#D1F8C3]"
                          : "bg-[#FFA9A9]"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="flex items-center gap-2 px-4 py-3">
                    <button
                      onClick={() => handleBlockUser(user)}
                      className="transition hover:scale-110"
                    >
                      {user.status === "Active" ? (
                        <MdBlockFlipped className="w-6 h-6 text-red-600" />
                      ) : (
                        <IoLockClosedOutline className="w-6 h-6 text-green-600" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="transition hover:scale-110"
                    >
                      <RiDeleteBin6Line className="w-6 h-6 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
