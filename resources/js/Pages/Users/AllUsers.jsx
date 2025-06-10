import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
    BookCopy,
    BookPlus,
    Users,
    UserPlus,
    LayoutDashboard,
} from "lucide-react";
import ValidateRedirection from "../Validation/ValidateRedirection";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AllUsers() {
    const { users } = usePage().props;

    const [modalOpen, setModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const confirmDelete = (id) => {
        router.delete(route("users.destroy", id), {
            onSuccess: () => {
                setModalOpen(false);
                setUserToDelete(null);
                toast.success("User deleted successfully");
            },
        });
    };

    const sidebarLinks = [
        { href: "/users/create", label: "Add Users", icon: UserPlus },
    ];

    return (
        <AuthenticatedLayout
            sidebarLinks={sidebarLinks}
            currentLink={"All Users"}
            isDashboard={false}
        >
            <Head title="All Users" />
            <div className="flex">
                {/* Main Content */}
                <div className="p-6 bg-gray-50 dark:bg-[#2A2A3B] text-gray-800 dark:text-gray-100 rounded shadow max-w-6xl mx-auto flex-1 mt-10">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-[#2A2A3B] text-left text-sm text-gray-600 dark:text-gray-300">
                                <th className="p-3 border border-gray-200 dark:border-gray-700">
                                    #
                                </th>
                                <th className="p-3 border border-gray-200 dark:border-gray-700">
                                    Name
                                </th>
                                <th className="p-3 border border-gray-200 dark:border-gray-700">
                                    Username
                                </th>
                                <th className="p-3 border border-gray-200 dark:border-gray-700">
                                    Email
                                </th>
                                <th className="p-3 border border-gray-200 dark:border-gray-700">
                                    Role
                                </th>
                                <th className="p-3 border border-gray-200 dark:border-gray-700">
                                    Joined
                                </th>
                                <th className="p-3 border border-gray-200 dark:border-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3 capitalize">
                                        {user.role}
                                    </td>
                                    <td className="p-3">
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 flex gap-3">
                                        <Link
                                            href={route("users.edit", user.id)}
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setUserToDelete(user.id);
                                                setModalOpen(true);
                                            }}
                                            className="text-red-600 dark:text-red-400 hover:underline"
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
                    <div className="bg-white dark:bg-[#2A2A3B] rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Delete User
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete this user? This
                            action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 dark:bg-[#3A3A4C] text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
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
