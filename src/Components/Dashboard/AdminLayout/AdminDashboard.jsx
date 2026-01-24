import React, { useMemo, useState } from "react";
import StatsCards from "./admin/StatsCard";
import UsersTable from "./UsersTable";
import { useGetDasboardQuery } from "../../../Redux/feature/auth/authapi";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");

  const { data: totalData, isLoading } = useGetDasboardQuery();

  // ✅ SAFE DEFAULT
  const users = totalData?.users || [];

  // ✅ Map API users to table-friendly users
  const mappedUsers = useMemo(() => {
    return users.map((user) => ({
      id: user.user_id,
      name: user.full_name || "N/A",
      email: user.email,
      date: new Date(user.registration_date).toLocaleDateString(),
      status: user.is_blocked ? "Blocked" : "Active",
    }));
  }, [users]);

  // 🔍 Search filter (SAFE)
  const filteredUsers = useMemo(() => {
    return mappedUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [mappedUsers, search]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* 📊 Stats */}
      <StatsCards
        total={totalData?.total_users || 0}
        active={totalData?.active_users || 0}
        blocked={totalData?.blocked_users || 0}
        guest={totalData?.guest_users || 0}
      />

      {/* 👥 Users Table */}
      <UsersTable users={filteredUsers} search={search} setSearch={setSearch} />
    </div>
  );
}
