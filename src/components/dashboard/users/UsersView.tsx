"use client";

import Banner from "@/components/dashboard/Banner";
import { mutateAdminResources } from "@/lib/adminClient";
import type { UserItem, UserMetrics } from "@/types/user";
import { useMemo, useState } from "react";
import AddEditUserModal from "./AddEditUserModal";
import UserDetailModal from "./UserDetailModal";
import UserFilterToolbar from "./UserFilterToolbar";
import UserMetricCards from "./UserMetricCards";
import UsersTable from "./UsersTable";

interface Props { users: UserItem[]; onDataChange: (items: UserItem[]) => void; onError: (message: string) => void; }

export default function UsersView({ users, onDataChange, onError }: Props) {
  const [searchQuery, setSearchQuery] = useState(""); const [selectedRole, setSelectedRole] = useState("All"); const [selectedStatus, setSelectedStatus] = useState("All"); const [userToEdit, setUserToEdit] = useState<UserItem | null>(null); const [viewingUser, setViewingUser] = useState<UserItem | null>(null); const [addEditModalOpen, setAddEditModalOpen] = useState(false); const [saving, setSaving] = useState(false);
  const metrics: UserMetrics = useMemo(() => ({ totalStaff: users.filter((item) => item.role !== "Resident").length, activeBhws: users.filter((item) => item.role === "BHW" && item.status === "Active").length, verifiedResidents: users.filter((item) => item.role === "Resident" && item.status === "Active").length, pendingApprovals: users.filter((item) => item.status === "Pending").length }), [users]);
  const filtered = useMemo(() => users.filter((item) => { const query = searchQuery.toLowerCase().trim(); return (!query || [item.name, item.email, item.phone, item.purok].some((value) => value.toLowerCase().includes(query))) && (selectedRole === "All" || item.role === selectedRole) && (selectedStatus === "All" || item.status === selectedStatus); }), [users, searchQuery, selectedRole, selectedStatus]);
  const mutate = async (action: string, payload: unknown) => { if (saving) return; setSaving(true); try { onDataChange((await mutateAdminResources(action, payload)).users); } catch (error) { onError(error instanceof Error ? error.message : "Unable to save user."); } finally { setSaving(false); } };
  return <div className="space-y-6 pb-12" aria-busy={saving}>
    <Banner title="Users Management" subtitle="Manage health workers, doctors, staff credentials, and registered residents." cardTitle="Barangay Health Personnel" cardSubtitle="Empowered health workers. Healthier communities!" className="mb-6" />
    <UserMetricCards metrics={metrics} />
    <UserFilterToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedRole={selectedRole} onRoleChange={setSelectedRole} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} onAddUser={() => { setUserToEdit(null); setAddEditModalOpen(true); }} />
    <UsersTable users={filtered} onViewUser={setViewingUser} onEditUser={(item) => { setUserToEdit(item); setAddEditModalOpen(true); }} onToggleStatus={(id) => { const item = users.find((entry) => entry.id === id); if (item) void mutate("setUserStatus", { id, status: item.status === "Active" ? "Inactive" : "Active" }); }} />
    <AddEditUserModal isOpen={addEditModalOpen} onClose={() => setAddEditModalOpen(false)} userToEdit={userToEdit} onSave={(item) => { void mutate("saveUser", item); setAddEditModalOpen(false); }} />
    <UserDetailModal isOpen={!!viewingUser} onClose={() => setViewingUser(null)} user={viewingUser} onEdit={(item) => { setUserToEdit(item); setAddEditModalOpen(true); }} />
  </div>;
}
