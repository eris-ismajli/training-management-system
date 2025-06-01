import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ValidateRedirection from '../Validation/ValidateRedirection';

import {
    BookCopy,
    LayoutDashboard,
} from "lucide-react";

import toast from 'react-hot-toast';

export default function Create() {
    const categories = ['Web', 'Design', 'Mobile', 'AI', 'Marketing'];

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        category: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/courses');
        toast.success('Course created successfully');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Course" />
            <div className="flex">
                {/* Sidebar */}
                <aside className="sticky top-0 h-screen w-64 bg-white shadow">
                    <h2 className="w-full h-12 flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#4c64c0] to-[#5aaee0] px-4">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                        Add Course
                    </h2>

                    <nav className="flex flex-col gap-4 text-lg text-gray-700 font-medium px-2 py-8">
                        <ValidateRedirection Component={Link} showIcon />
                        <Link href="/courses" className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                            <BookCopy className="w-5 h-5" />
                            <span>All Courses</span>
                        </Link>
                    </nav>
                </aside>
                <div className="flex-1 p-6">
                    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium text-sm text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-md"
                                    placeholder="Course Title"
                                />
                                {errors.title && <div className="text-sm text-red-500 mt-1">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-md"
                                    rows="4"
                                    placeholder="Course Description"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block font-medium text-sm text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={e => setData('start_date', e.target.value)}
                                        className="w-full mt-1 px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block font-medium text-sm text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={e => setData('end_date', e.target.value)}
                                        className="w-full mt-1 px-4 py-2 border rounded-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700">Category</label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-md"
                                >
                                    <option value="">-- Select Category --</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                {errors.category && <div className="text-sm text-red-500 mt-1">{errors.category}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
