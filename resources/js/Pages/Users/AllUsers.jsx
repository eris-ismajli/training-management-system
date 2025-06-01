import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import {
    BookCopy,
    BookPlus,
    Users,
    UserPlus,
    LayoutDashboard,
} from "lucide-react";
import ValidateRedirection from '../Validation/ValidateRedirection';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AllUsers() {
    const { users } = usePage().props;

    const [modalOpen, setModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const confirmDelete = (id) => {
        router.delete(route('users.destroy', id), {
            onSuccess: () => {
                setModalOpen(false);
                setUserToDelete(null);
                toast.success('User deleted successfully');
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="All Users" />
            <div className="flex">
                {/* Sidebar */}
                <aside className="sticky top-0 h-screen w-64 bg-white shadow">
                    <h2 className="w-full h-12 flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#4c64c0] to-[#5aaee0] px-4">
                        <Users className="w-5 h-5 text-white" />
                        All Users
                    </h2>

                    <nav className="flex flex-col gap-4 text-lg text-gray-700 font-medium px-2 py-8">
                        <ValidateRedirection Component={Link} showIcon />
                        <Link href="/users/create" className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                            <UserPlus className="w-5 h-5" />
                            <span>Add Users</span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto flex-1">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm text-gray-600">
                                <th className="p-3 border">#</th>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Username</th>
                                <th className="p-3 border">Email</th>
                                <th className="p-3 border">Role</th>
                                <th className="p-3 border">Joined</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="border-t hover:bg-gray-50 text-sm">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3 capitalize">{user.role}</td>
                                    <td className="p-3">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="p-3 flex gap-3">
                                        <Link
                                            href={route('users.edit', user.id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setUserToDelete(user.id);
                                                setModalOpen(true);
                                            }}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Delete User</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => confirmDelete(userToDelete)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
