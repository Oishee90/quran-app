import { FaBan, FaLock } from "react-icons/fa";

const UsersTable = ({ users, onToggleStatus, search, setSearch }) => {
  return (
    <div className="mt-6 overflow-hidden rounded-xl">
      {/* Search */}
      <div className="py-4 ">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email or name"
          className="w-full px-4 py-2 border border-[#a8a7a794] rounded-lg outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm rounded-xl bg-[#9e9d9d36] ">
        <thead className="text-gray-600 ">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Registration Date</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-400">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.date}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggleStatus(user.id)}
                    className="transition hover:scale-110"
                  >
                    {user.status === "Active" ? (
                      <FaBan className="text-red-500" />
                    ) : (
                      <FaLock className="text-green-600" />
                    )}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
