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

    return (
        <AuthenticatedLayout>
            <Head title="Add User" />

            <div className="flex">
                {/* Sidebar */}
                <aside className="sticky top-0 h-screen w-64 bg-white shadow">
                    <h2 className="w-full h-12 flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#4c64c0] to-[#5aaee0] px-4">
                        <UserPlus className="w-5 h-5 text-white" />
                        Add User
                    </h2>

                    <nav className="flex flex-col gap-4 text-lg text-gray-700 font-medium px-2 py-8">
                        <ValidateRedirection Component={Link} showIcon />
                        <Link
                            href="/users"
                            className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition"
                        >
                            <Users className="w-5 h-5" />
                            <span>All Users</span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Form Content */}
                <main className="flex-1 max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                        </div>
                        <div>
                            <label>Surname</label>
                            <input
                                type="text"
                                value={data.surname}
                                onChange={e => setData('surname', e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            {errors.surname && <div className="text-red-600 text-sm">{errors.surname}</div>}
                        </div>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={e => setData('username', e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            {errors.username && <div className="text-red-600 text-sm">{errors.username}</div>}
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
                        </div>
                        <div>
                            <label>Role</label>
                            <select
                                value={data.role}
                                onChange={e => setData('role', e.target.value)}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Select Role</option>
                                <option value="trainer">Trainer</option>
                                <option value="student">Student</option>
                            </select>
                            {errors.role && <div className="text-red-600 text-sm">{errors.role}</div>}
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
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
