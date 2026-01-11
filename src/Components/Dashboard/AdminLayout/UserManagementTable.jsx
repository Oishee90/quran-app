import React, { useMemo, useState, useEffect } from "react";
import UsersTable from "./UsersTable";

export default function UserManagementTable() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // All | Active | Blocked
  const [currentPage, setCurrentPage] = useState(1);

  // 🔢 USERS PER PAGE (set 3 for demo, change to 10 later)
  const USERS_PER_PAGE = 5;

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      date: "Aug 30, 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Fatima Ali",
      email: "fatima.ali@example.com",
      date: "Aug 30, 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Omar Ibrahim",
      email: "omar.ibrahim@example.com",
      date: "Aug 30, 2025",
      status: "Active",
    },
    {
      id: 4,
      name: "Zahra Hussein",
      email: "zahra.hussein@example.com",
      date: "Aug 30, 2025",
      status: "Blocked",
    },
    {
      id: 5,
      name: "Yusuf Rahman",
      email: "yusuf.rahman@example.com",
      date: "Aug 30, 2025",
      status: "Blocked",
    },
  ]);

  // 🔁 Block / Unblock User
  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );
  };

  // 🔍 Filter + Search
  const filteredUsers = useMemo(() => {
    let data = users;

    if (filterStatus !== "All") {
      data = data.filter((user) => user.status === filterStatus);
    }

    if (search) {
      data = data.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [users, search, filterStatus]);

  // 📄 Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  // 🔄 Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus]);

  return (
    <div className="min-h-screen p-6 pippins bg-gray-50">
      {/* 🔘 Filter Tabs */}
      <div className="flex gap-3 mb-4">
        {["All", "Active", "Blocked"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border
              ${
                filterStatus === status
                  ? "bg-[#2658C4] text-white border-[#2658C4]"
                  : "bg-white text-black border-[#2658C4]"
              }`}
          >
            {status === "All"
              ? "All Users list"
              : status === "Active"
              ? "Active Users list"
              : "Block Users list"}
          </button>
        ))}
      </div>

      {/* 📋 Users Table */}
      <UsersTable
        users={paginatedUsers}
        onToggleStatus={toggleUserStatus}
        search={search}
        setSearch={setSearch}
      />

      {/* 🔢 Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-lg border
                ${
                  currentPage === index + 1
                    ? "bg-[#2658C4] text-white border-[#2658C4]"
                    : "bg-white"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
