import React, { useMemo, useState } from "react";
import StatsCards from "./admin/StatsCard";
import UsersTable from "./UsersTable";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");

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

  // 🔁 Block / Unblock
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

  // 🔍 Search filter
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // 📊 Stats
  const total = users.length;
  const active = users.filter((u) => u.status === "Active").length;
  const blocked = users.filter((u) => u.status === "Blocked").length;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <StatsCards total={total} active={active} blocked={blocked} />

      <UsersTable
        users={filteredUsers}
        onToggleStatus={toggleUserStatus}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}
