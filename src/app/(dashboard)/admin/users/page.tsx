"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UserManagementPage() {
    const [users, setUsers] = useState([
        { id: 1, name: "Alex Johnson", role: "Student", email: "alex@example.com", joined: "Jan 15, 2026" },
        { id: 2, name: "Dr. Emily Chen", role: "Tutor", email: "emily@acelab.com", joined: "Dec 10, 2025" },
        { id: 3, name: "Sarah Martinez", role: "Student", email: "sarah@example.com", joined: "Feb 5, 2026" },
        { id: 4, name: "James Wilson", role: "Tutor", email: "james@acelab.com", joined: "Nov 20, 2025" },
    ])

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "Student"
    })

    const handleCreateUser = () => {
        const user = {
            id: users.length + 1,
            ...newUser,
            joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
        setUsers([...users, user])
        setShowCreateModal(false)
        setNewUser({ name: "", email: "", role: "Student" })
    }

    const handleDeleteUser = (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== id))
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">User Management</h1>
                    <p className="text-slate-600">Create, manage, and remove users from the platform</p>
                </div>
                <Button onClick={() => setShowCreateModal(true)} className="bg-green-600 hover:bg-green-700">
                    <Plus size={18} className="mr-2" /> Create User
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
                    <h3 className="text-sm font-semibold opacity-90 mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">{users.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                    <h3 className="text-sm font-semibold opacity-90 mb-2">Students</h3>
                    <p className="text-3xl font-bold">{users.filter(u => u.role === "Student").length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                    <h3 className="text-sm font-semibold opacity-90 mb-2">Tutors</h3>
                    <p className="text-3xl font-bold">{users.filter(u => u.role === "Tutor").length}</p>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">All Users</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                            <tr>
                                <th className="px-6 py-3 font-medium text-left">Name</th>
                                <th className="px-6 py-3 font-medium text-left">Email</th>
                                <th className="px-6 py-3 font-medium text-left">Role</th>
                                <th className="px-6 py-3 font-medium text-left">Joined</th>
                                <th className="px-6 py-3 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "Student"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-purple-100 text-purple-700"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{user.joined}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button variant="outline" size="sm" className="h-8 text-xs">
                                                View Profile
                                            </Button>
                                            <Button variant="outline" size="sm" className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
                                                Message
                                            </Button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                title="Remove User"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Create New User</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="Student">Student</option>
                                    <option value="Tutor">Tutor</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">
                                Cancel
                            </Button>
                            <Button onClick={handleCreateUser} className="flex-1 bg-green-600 hover:bg-green-700">
                                Create User
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
