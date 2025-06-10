import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { BookCopy } from "lucide-react";

const sidebarLinks = [
    { href: "/enrolled-courses", label: "My Courses", icon: BookCopy },
];

export default function StudentDashboard({
    auth,
    enrolledCourses = [],
    progressStats = {},
}) {
    return (
        <AuthenticatedLayout
            sidebarLinks={sidebarLinks}
            currentLink={"Dashboard"}
            isDashboard={true}
        >
            <Head title="Student Dashboard" />

            <div className="flex min-h-screen bg-[#f9fafb] dark:bg-[#1E1E2F] text-gray-900 dark:text-gray-100">
                <main className="flex-1 py-12 px-10">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Welcome Section */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-100">
                                Welcome back, {auth?.user?.name || "Student"}!
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Keep learning, track your progress, and stay
                                ahead of your deadlines.
                            </p>
                        </div>

                        {/* Enrolled Courses */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                                Enrolled Courses ({enrolledCourses?.length || 0}
                                )
                            </h3>
                            {enrolledCourses?.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                    {enrolledCourses.map((course) => (
                                        <li key={course.id}>{course.title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                    You are not enrolled in any courses yet.
                                </p>
                            )}
                        </div>

                        {/* Dashboard Metrics */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                                Your Dashboard
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 rounded">
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Courses Enrolled
                                    </p>
                                    <p className="text-xl font-bold text-green-800 dark:text-green-300">
                                        {enrolledCourses?.length || 0}
                                    </p>
                                </div>
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Average Progress
                                    </p>
                                    <p className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
                                        {progressStats?.average || 0}%
                                    </p>
                                </div>
                                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 rounded">
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Upcoming Deadlines
                                    </p>
                                    <p className="text-xl font-bold text-purple-800 dark:text-purple-300">
                                        {progressStats?.deadlines || 0}
                                    </p>
                                </div>
                            </div>

                            {/* Course Completion Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {(progressStats?.courses || []).map(
                                    (course) => (
                                        <div
                                            key={course.id}
                                            className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded"
                                        >
                                            <p className="font-medium text-gray-700 dark:text-gray-200">
                                                {course.title}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Completion: {course.completion}%
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                                Announcements
                            </h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li className="border-b border-gray-200 dark:border-gray-700 pb-2">
                                    📢 New course materials available now.
                                </li>
                                <li className="border-b border-gray-200 dark:border-gray-700 pb-2">
                                    📆 Assignment deadline: June 10th.
                                </li>
                                <li className="border-b border-gray-200 dark:border-gray-700 pb-2">
                                    🎓 Certificates will be awarded after final
                                    quiz.
                                </li>
                            </ul>
                        </div>

                        {/* Profile Summary */}
                        <div className="bg-white dark:bg-[#2A2A3B] p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                                Profile Summary
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Name: {auth?.user?.name || "N/A"}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                Role: Student
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                Courses Enrolled: {enrolledCourses?.length || 0}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
