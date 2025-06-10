import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Star,
    Award,
    BookCopy,
    BookPlus,
    Users,
    UserPlus,
    LayoutDashboard,
} from "lucide-react";

const sidebarLinks = [
    { href: "/trainer/students", label: "My Students", icon: Users },
    { href: "/assigned-courses", label: "Assigned Courses", icon: BookCopy },
];

export default function TrainerDashboard({
    auth,
    assignedCourseCount,
    assignedCourses,
    uniqueStudentCount,
}) {
    return (
        <AuthenticatedLayout sidebarLinks={sidebarLinks} currentLink={"Dashboard"} isDashboard={true}>
            <Head title="Trainer Dashboard" />

            <div className="flex min-h-screen bg-gray-50 dark:bg-[#1E1E2F] text-gray-900 dark:text-white">
                <main className="flex-1 py-12 px-10">
                    <div className="max-w-7xl mx-auto space-y-6">

                        {/* Welcome Section */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-100">
                                Welcome back, trainer!
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                Manage your courses, view student progress, and stay updated with announcements.
                            </p>
                        </div>

                        {/* Assigned Courses */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Assigned Courses ({assignedCourseCount})
                            </h3>
                            {assignedCourses.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                    {assignedCourses.map((course) => (
                                        <li key={course.id}>{course.title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                    No courses assigned yet.
                                </p>
                            )}
                        </div>

                        {/* Dashboard Metrics */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Your Dashboard
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded">
                                    <p className="text-sm text-gray-500 dark:text-gray-300">My Students</p>
                                    <p className="text-xl font-bold text-blue-800 dark:text-blue-300">{uniqueStudentCount}</p>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 rounded">
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Assigned Courses</p>
                                    <p className="text-xl font-bold text-green-800 dark:text-green-300">{assignedCourseCount}</p>
                                </div>
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 rounded">
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Avg. Course Rating</p>
                                    <p className="text-xl font-bold text-yellow-800 dark:text-yellow-300">4.6 ★</p>
                                </div>
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-400 rounded">
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Certificates Issued</p>
                                    <p className="text-xl font-bold text-purple-800 dark:text-purple-300">29</p>
                                </div>
                            </div>

                            {/* Student Progress */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-100 dark:bg-blue-800/30 rounded">
                                    <p className="font-medium text-gray-700 dark:text-gray-200">React Basics</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Avg Completion: 82%</p>
                                </div>
                                <div className="p-4 bg-green-100 dark:bg-green-800/30 rounded">
                                    <p className="font-medium text-gray-700 dark:text-gray-200">Laravel</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Avg Completion: 76%</p>
                                </div>
                                <div className="p-4 bg-yellow-100 dark:bg-yellow-800/30 rounded">
                                    <p className="font-medium text-gray-700 dark:text-gray-200">UX Design</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Avg Completion: 64%</p>
                                </div>
                            </div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Announcements
                            </h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li className="border-b pb-2 border-gray-200 dark:border-gray-700">
                                    📢 Course evaluations begin next week.
                                </li>
                                <li className="border-b pb-2 border-gray-200 dark:border-gray-700">
                                    📂 New training materials upload on Friday.
                                </li>
                                <li className="border-b pb-2 border-gray-200 dark:border-gray-700">
                                    🎓 Certification stats updated monthly.
                                </li>
                            </ul>
                        </div>

                        {/* Profile Summary */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Profile Summary
                            </h3>
                            <p className="text-gray-700 dark:text-gray-200">Name: {auth.user.name}</p>
                            <p className="text-gray-700 dark:text-gray-200">Role: Trainer</p>
                            <p className="text-gray-700 dark:text-gray-200">Courses Managed: {assignedCourseCount}</p>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
