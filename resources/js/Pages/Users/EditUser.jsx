import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function EditUser({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        role: user.role || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`);
        toast.success('User edited successfully');
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Edit User</h2>}
        >
            <Head title="Edit User" />

            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label>Username</label>
                        <input type="text" value={data.username} onChange={e => setData('username', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.username && <div className="text-red-600 text-sm">{errors.username}</div>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full border p-2 rounded" />
                        {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
                    </div>
                    <div>
                        <label>Role</label>
                        <select value={data.role} onChange={e => setData('role', e.target.value)} className="w-full border p-2 rounded">
                            <option value="">Select Role</option>
                            <option value="trainer">trainer</option>
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.role && <div className="text-red-600 text-sm">{errors.role}</div>}
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={processing}>
                        Update User
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
