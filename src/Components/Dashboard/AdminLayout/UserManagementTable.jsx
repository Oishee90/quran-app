import React, { useMemo, useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import { useGetDasboardQuery } from "../../../Redux/feature/auth/authapi";

export default function UserManagementTable() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useGetDasboardQuery();

  //  USERS PER PAGE
  const USERS_PER_PAGE = 5;

  // Normalize API users
  const users = useMemo(() => {
    if (!data?.users) return [];

    return data.users.map((user) => ({
      id: user.user_id,
      name: user.full_name || "N/A",
      email: user.email,
      date: new Date(user.registration_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: user.is_blocked ? "Blocked" : "Active",
    }));
  }, [data]);

  // 🔍 Filter + Search Logic
  const filteredUsers = useMemo(() => {
    let result = users;

    if (filterStatus !== "All") {
      result = result.filter((user) => user.status === filterStatus);
    }

    if (search) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [users, search, filterStatus]);

  // 📄 Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  //  Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg font-medium">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pippins bg-gray-50">
      {/* Filter Tabs */}
      <div className="flex gap-3 mb-4">
        {["All", "Active", "Blocked"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition
              ${
                filterStatus === status
                  ? "bg-[#2658C4] text-white border-[#2658C4]"
                  : "bg-white text-black border-[#2658C4]"
              }`}
          >
            {status === "All"
              ? `All Users (${data?.total_users || 0})`
              : status === "Active"
              ? `Active Users (${data?.active_users || 0})`
              : `Blocked Users (${data?.blocked_users || 0})`}
          </button>
        ))}
      </div>

      {/*  Users Table */}
      <UsersTable
        users={paginatedUsers}
        search={search}
        setSearch={setSearch}
        refetch = {refetch}
      />

      {/*  Pagination */}
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
