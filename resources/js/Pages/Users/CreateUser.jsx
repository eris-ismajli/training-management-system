import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus, Users } from "lucide-react";
import ValidateRedirection from '../Validation/ValidateRedirection';
import toast from 'react-hot-toast';

export default function CreateUser() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        role: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/users');
        toast.success('User created successfully');
    };

    const sidebarLinks = [
        { href: '/users', label: 'All Users', icon: Users },
    ];

    return (
        <AuthenticatedLayout sidebarLinks={sidebarLinks} currentLink={"Add Users"} isDashboard={false}>
            <Head title="Add User" />

            <div className="flex">
                {/* Main Form Content */}
                <main className="flex-1 max-w-2xl mx-auto mt-8 p-6 bg-gray-100 dark:bg-[#2A2A3B] text-gray-900 dark:text-white shadow rounded">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Surname</label>
                            <input
                                type="text"
                                value={data.surname}
                                onChange={e => setData('surname', e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                            {errors.surname && <div className="text-red-600 text-sm mt-1">{errors.surname}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={e => setData('username', e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                            {errors.username && <div className="text-red-600 text-sm mt-1">{errors.username}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Role</label>
                            <select
                                value={data.role}
                                onChange={e => setData('role', e.target.value)}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            >
                                <option value="">Select Role</option>
                                <option value="trainer">Trainer</option>
                                <option value="student">Student</option>
                            </select>
                            {errors.role && <div className="text-red-600 text-sm mt-1">{errors.role}</div>}
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={processing}
                        >
                            Add User
                        </button>
                    </form>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
