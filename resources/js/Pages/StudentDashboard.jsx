import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import {
    BookCopy,
    Star,
    Clock,
    LayoutDashboard,
} from "lucide-react";

export default function StudentDashboard({ auth, enrolledCourses = [], progressStats = {} }) {
    return (
        <AuthenticatedLayout>
            <Head title="Student Dashboard" />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="sticky top-0 h-screen w-64 bg-white shadow">
                    <h2 className="w-full h-12 flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#d96811] to-[#ff9d52] px-4">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                        Dashboard
                    </h2>

                    <nav className="flex flex-col gap-4 text-lg text-gray-700 font-medium px-2 py-8">
                        <Link
                            href="/enrolled-courses"
                            className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition"
                        >
                            <BookCopy className="w-5 h-5" />
                            <span>My Courses</span>
                        </Link>
                        <Link
                            href="/progress"
                            className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition"
                        >
                            <Star className="w-5 h-5" />
                            <span>Progress</span>
                        </Link>
                        <Link
                            href="/deadlines"
                            className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition"
                        >
                            <Clock className="w-5 h-5" />
                            <span>Upcoming Deadlines</span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 py-12 px-10">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Welcome Section */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <p className="text-lg font-medium text-gray-700">
                                Welcome back, {auth?.user?.name || 'Student'}!
                            </p>
                            <p className="text-sm text-gray-500">
                                Keep learning, track your progress, and stay ahead of your deadlines.
                            </p>
                        </div>

                        {/* Enrolled Courses */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Enrolled Courses ({enrolledCourses?.length || 0})
                            </h3>
                            {enrolledCourses?.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 text-gray-600">
                                    {enrolledCourses.map((course) => (
                                        <li key={course.id}>{course.title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">You are not enrolled in any courses yet.</p>
                            )}
                        </div>

                        {/* Dashboard Metrics */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Your Dashboard
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                                    <p className="text-sm text-gray-500">Courses Enrolled</p>
                                    <p className="text-xl font-bold text-green-800">{enrolledCourses?.length || 0}</p>
                                </div>
                                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                                    <p className="text-sm text-gray-500">Average Progress</p>
                                    <p className="text-xl font-bold text-yellow-800">
                                        {progressStats?.average || 0}%
                                    </p>
                                </div>
                                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
                                    <p className="text-sm text-gray-500">Upcoming Deadlines</p>
                                    <p className="text-xl font-bold text-purple-800">
                                        {progressStats?.deadlines || 0}
                                    </p>
                                </div>
                            </div>

                            {/* Course Completion Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {(progressStats?.courses || []).map((course) => (
                                    <div key={course.id} className="p-4 bg-blue-100 rounded">
                                        <p className="font-medium text-gray-700">{course.title}</p>
                                        <p className="text-sm text-gray-600">
                                            Completion: {course.completion}%
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Announcements</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="border-b pb-2">📢 New course materials available now.</li>
                                <li className="border-b pb-2">📆 Assignment deadline: June 10th.</li>
                                <li className="border-b pb-2">🎓 Certificates will be awarded after final quiz.</li>
                            </ul>
                        </div>

                        {/* Profile Summary */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Summary</h3>
                            <p className="text-gray-700">Name: {auth?.user?.name || 'N/A'}</p>
                            <p className="text-gray-700">Role: Student</p>
                            <p className="text-gray-700">Courses Enrolled: {enrolledCourses?.length || 0}</p>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
