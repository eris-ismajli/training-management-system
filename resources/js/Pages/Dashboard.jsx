import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

import {
    BookCopy,
    BookPlus,
    Users,
    UserPlus,
    LayoutDashboard,
    GraduationCap,
    ChartNoAxesCombined,
    ChartColumn,
} from "lucide-react";

export default function Dashboard() {
    const {
        stats = { courses: 0, users: 0 },
        course_growth = [],
        category_distribution = [],
    } = usePage().props;

    const categoryColors = {
        Web: '#6366F1',
        Design: '#F59E0B',
        Mobile: '#10B981',
        AI: '#8B5CF6',
        Marketing: '#EF4444',
        Uncategorized: '#9CA3AF',
    };


    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex">
                {/* Sidebar */}
                <aside className="sticky top-0 h-screen w-64 bg-white shadow">
                    <h2 className="w-full h-12 flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#4c64c0] to-[#5aaee0] px-4">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                        Dashboard
                    </h2>


                    <nav className="flex flex-col gap-4 text-lg text-gray-700 font-medium px-2 py-8">
                        <Link href="/courses" className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                            <BookCopy className="w-5 h-5" />
                            <span>All Courses</span>
                        </Link>
                        <Link href="/courses/create" className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                            <BookPlus className="w-5 h-5" />
                            <span>Add Course</span>
                        </Link>
                        <Link href="/users" className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                            <Users className="w-5 h-5" />
                            <span>All Users</span>
                        </Link>
                        <Link href="/users/create" className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                            <UserPlus className="w-5 h-5" />
                            <span>Add Users</span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 py-12 px-6 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* 🟠 Orange Card */}
                        <div className="relative bg-white shadow rounded-lg p-6">
                            <div className="absolute -top-4 right-3 w-12 h-12 bg-gradient-to-tr from-[#cf8334] to-[#eda945] rounded-md flex items-center justify-center shadow-md">
                                <BookCopy className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-700">
                                Total Courses
                            </h3>
                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                {stats.courses}
                            </p>
                        </div>

                        {/* 🟢 Green Card */}
                        <div className="relative bg-white shadow rounded-lg p-6">
                            <div className="absolute -top-4 right-3 w-12 h-12 bg-gradient-to-tr from-[#417d64] to-[#5b9f80] rounded-md flex items-center justify-center shadow-md">
                                <Users className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-700">
                                Total Users
                            </h3>
                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                {stats.users}
                            </p>
                        </div>

                        {/* 🟢 Purple Card */}
                        <div className="relative bg-white shadow rounded-lg p-6">
                            <div className="absolute -top-4 right-3 w-12 h-12 bg-gradient-to-tr from-[#733d91] to-[#a751d6] rounded-md flex items-center justify-center shadow-md">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-700">
                                Total Students
                            </h3>
                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                {stats.students}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <ChartNoAxesCombined className="w-6 h-6 text-blue-600" />
                            Course Growth Over Time
                        </h3>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={course_growth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <ChartColumn className="w-6 h-6 text-blue-600" />
                            Courses by Category
                        </h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Pie
                                    data={category_distribution}
                                    dataKey="count"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    label={({ name, value }) =>
                                        `${name || 'Uncategorized'} (${value})`
                                    }
                                >
                                    {category_distribution.map((entry, index) => {
                                        const label = entry.category || 'Uncategorized';
                                        return (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={categoryColors[label] || categoryColors.Uncategorized}
                                            />
                                        );
                                    })}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [`${value} Courses`, `Category: ${name || 'Uncategorized'}`]}
                                />
                                <Legend verticalAlign="bottom" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}
