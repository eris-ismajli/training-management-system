import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import {
    BookCopy,
    BookPlus,
    Users,
    UserPlus,
    GraduationCap,
    ChartNoAxesCombined,
    ChartColumn,
} from "lucide-react";
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
} from "recharts";

export default function Dashboard() {
    const {
        stats = { courses: 0, users: 0 },
        course_growth = [],
        category_distribution = [],
    } = usePage().props;

    const categoryColors = {
        Web: "#6366F1",
        Design: "#F59E0B",
        Mobile: "#10B981",
        AI: "#8B5CF6",
        Marketing: "#EF4444",
        Uncategorized: "#9CA3AF",
    };

    const sidebarLinks = [
        { href: "/courses", label: "All Courses", icon: BookCopy },
        { href: "/courses/create", label: "Add Course", icon: BookPlus },
        { href: "/users", label: "All Users", icon: Users },
        { href: "/users/create", label: "Add Users", icon: UserPlus },
    ];

    return (
        <AuthenticatedLayout
            sidebarLinks={sidebarLinks}
            currentLink={"Dashboard"}
            isDashboard={true}
        >
            <Head title="Dashboard" />

            <div className="flex-1 py-12 px-6 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* 🟠 Orange Card */}
                    <div className="relative bg-white dark:bg-[#2A2A3B] shadow rounded-lg p-6">
                        <div className="absolute -top-4 right-3 w-12 h-12 bg-gradient-to-tr from-[#cf8334] to-[#eda945] rounded-md flex items-center justify-center shadow-md">
                            <BookCopy className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-[#E4E4E7]">
                            Total Courses
                        </h3>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-3xl font-bold text-indigo-600 dark:text-[#4FD1C5]">
                                {stats.courses}
                            </p>
                            <Link
                                href={`/courses`}
                                className="text-blue-600 hover:underline"
                            >
                                View
                            </Link>
                        </div>
                    </div>

                    {/* 🟢 Green Card */}
                    <div className="relative bg-white dark:bg-[#2A2A3B] shadow rounded-lg p-6">
                        <div className="absolute -top-4 right-3 w-12 h-12 bg-gradient-to-tr from-[#417d64] to-[#5b9f80] rounded-md flex items-center justify-center shadow-md">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-[#E4E4E7]">
                            Total Trainers
                        </h3>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-3xl font-bold text-indigo-600 dark:text-[#4FD1C5]">
                                {stats.trainers}
                            </p>
                            <Link
                                href={`/trainers`}
                                className="text-blue-600 hover:underline"
                            >
                                View
                            </Link>
                        </div>
                    </div>

                    {/* 🟣 Purple Card */}
                    <div className="relative bg-white dark:bg-[#2A2A3B] shadow rounded-lg p-6">
                        <div className="absolute -top-4 right-3 w-12 h-12 bg-gradient-to-tr from-[#733d91] to-[#a751d6] rounded-md flex items-center justify-center shadow-md">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-[#E4E4E7]">
                            Total Students
                        </h3>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-3xl font-bold text-indigo-600 dark:text-[#4FD1C5]">
                                {stats.students}
                            </p>
                            <Link
                                href={`/students`}
                                className="text-blue-600 hover:underline"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#2A2A3B] shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-[#E4E4E7] mb-4 flex items-center gap-2">
                        <ChartNoAxesCombined className="w-6 h-6 text-blue-600" />
                        Course Growth Over Time
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={course_growth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#4f46e5"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-[#2A2A3B] shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-[#E4E4E7] mb-4 flex items-center gap-2">
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
                                    `${name || "Uncategorized"} (${value})`
                                }
                            >
                                {category_distribution.map((entry, index) => {
                                    const label =
                                        entry.category || "Uncategorized";
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                categoryColors[label] ||
                                                categoryColors.Uncategorized
                                            }
                                        />
                                    );
                                })}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [
                                    `${value} Courses`,
                                    `Category: ${name || "Uncategorized"}`,
                                ]}
                            />
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
