import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { cardClass, modalClass, inputClass } from "@/Styles/ClassNames";

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

    const sidebarLinks = [
        { href: '/courses', label: 'All Courses', icon: BookCopy },
    ];

    return (
        <AuthenticatedLayout sidebarLinks={sidebarLinks} currentLink={"Add Course"} isDashboard={false}>
            <Head title="Add Course" />
            <div className="flex">
                {/* Sidebar */}

                <div className="flex-1 p-6">
                    <div className="max-w-2xl mx-auto bg-white dark:bg-[#2A2A3B] text-gray-800 dark:text-white p-6 shadow rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                                    placeholder="Course Title"
                                />
                                {errors.title && <div className="text-sm text-red-500 mt-1">{errors.title}</div>}
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                                    rows="4"
                                    placeholder="Course Description"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Start Date</label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={e => setData('start_date', e.target.value)}
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">End Date</label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={e => setData('end_date', e.target.value)}
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">Category</label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
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
