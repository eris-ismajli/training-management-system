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

export default function TrainerDashboard({ auth, assignedCourseCount, assignedCourses, uniqueStudentCount }) {
    return (
        <AuthenticatedLayout>
            <Head title="trainer Dashboard" />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="sticky top-0 h-screen w-64 bg-white shadow">
                    <h2 className="w-full h-12 flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#664D85] to-[#956EBD] px-4">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                        Dashboard
                    </h2>

                    <nav className="flex flex-col gap-4 text-lg text-gray-700 font-medium px-2 py-8">
                        <Link
                            href="/trainer/students"
                            className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition"
                        >
                            <Users className="w-5 h-5" />
                            <span>My Students</span>
                        </Link>

                        <Link
                            href="/assigned-courses"
                            className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition"
                        >
                            <BookCopy className="w-5 h-5" />
                            <span>Assigned Courses</span>
                        </Link>



                        <Link className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                            <Star className="w-5 h-5" />
                            <span>Course Ratings</span>
                        </Link>
                        <Link className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                            <Award className="w-5 h-5" />
                            <span>Certificates Issued</span>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 py-12 px-10">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Welcome Section */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <p className="text-lg font-medium text-gray-700">
                                Welcome back, trainer!
                            </p>
                            <p className="text-sm text-gray-500">
                                Manage your courses, view student progress, and
                                stay updated with announcements.
                            </p>
                        </div>

                        {/* Assigned Courses */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Assigned Courses ({assignedCourseCount})
                            </h3>
                            {assignedCourses.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 text-gray-600">
                                    {assignedCourses.map((course) => (
                                        <li key={course.id}>{course.title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No courses assigned yet.</p>
                            )}
                        </div>

                        {/* Dashboard Metrics */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Your Dashboard
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                                    <p className="text-sm text-gray-500">My Students</p>
                                    <p className="text-xl font-bold text-blue-800">{uniqueStudentCount}</p>

                                </div>
                                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                                    <p className="text-sm text-gray-500">Assigned Courses</p>
                                    <p className="text-xl font-bold text-green-800">{assignedCourseCount}</p>
                                </div>
                                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                                    <p className="text-sm text-gray-500">Avg. Course Rating</p>
                                    <p className="text-xl font-bold text-yellow-800">4.6 ★</p>
                                </div>
                                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
                                    <p className="text-sm text-gray-500">Certificates Issued</p>
                                    <p className="text-xl font-bold text-purple-800">29</p>
                                </div>
                            </div>

                            {/* Student Progress */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-100 rounded">
                                    <p className="font-medium text-gray-700">React Basics</p>
                                    <p className="text-sm text-gray-600">Avg Completion: 82%</p>
                                </div>
                                <div className="p-4 bg-green-100 rounded">
                                    <p className="font-medium text-gray-700">Laravel</p>
                                    <p className="text-sm text-gray-600">Avg Completion: 76%</p>
                                </div>
                                <div className="p-4 bg-yellow-100 rounded">
                                    <p className="font-medium text-gray-700">UX Design</p>
                                    <p className="text-sm text-gray-600">Avg Completion: 64%</p>
                                </div>
                            </div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Announcements</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="border-b pb-2">
                                    📢 Course evaluations begin next week.
                                </li>
                                <li className="border-b pb-2">
                                    📂 New training materials upload on Friday.
                                </li>
                                <li className="border-b pb-2">
                                    🎓 Certification stats updated monthly.
                                </li>
                            </ul>
                        </div>

                        {/* Profile Summary */}
                        <div className="bg-white p-6 shadow rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Summary</h3>
                            <p className="text-gray-700">Name: {auth.user.name}</p>
                            <p className="text-gray-700">Role: Trainer</p>
                            <p className="text-gray-700">Courses Managed: {assignedCourseCount}</p>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}