import { FaBan, FaLock } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdBlockFlipped } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
const UsersTable = ({ users, onToggleStatus, search, setSearch }) => {
  return (
    <div className="mt-6 overflow-hidden rounded-xl poppins">
      {/* Search */}
      <div className="py-4 ">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email or name"
          className="w-full px-4 py-2 border border-[#9E9D9D] rounded-xl outline-none focus:ring-1 focus:ring-[#777575] placeholder:text-sm"
        />
      </div>

      {/* Table */}
      <div className="border rounded-xl border-[#9E9D9D]">
        <table className="w-full text-base  rounded-xl bg-[#f5f5f5]   ">
          <thead className="">
            <tr>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">Email</th>
              <th className="px-4 py-4 text-left">Registration Date</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="bg-[#FFFFFF] ">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[#9C9C9C] text-base "
                >
                  <td className="px-4 py-6 rounded-b-xl">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.date}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs  rounded-full font-medium ${
                        user.status === "Active"
                          ? "bg-[#D1F8C3]"
                          : "bg-[#FFA9A9]"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="flex items-center gap-4 px-4 py-3 rounded-b-xl">
                    <button
                      onClick={() => onToggleStatus(user.id)}
                      className="transition hover:scale-110"
                    >
                      {user.status === "Active" ? (
                        <MdBlockFlipped className="text-[#FE0000] w-6 h-6" />
                      ) : (
                        <IoLockClosedOutline className="text-[#2DA601] w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => onToggleStatus(user.id)}
                      className="transition hover:scale-110"
                    >
                      <RiDeleteBin6Line className="text-[#FE0000] w-6 h-6" />
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
