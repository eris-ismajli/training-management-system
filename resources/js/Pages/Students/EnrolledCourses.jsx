import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { BookOpen, BookCopy, Star, Clock } from "lucide-react";
import ValidateRedirection from "../Validation/ValidateRedirection";

export default function EnrolledCourses({ auth, enrolledCourses = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Courses" />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="sticky top-0 h-screen w-64 bg-white shadow">
                    <h2 className="w-full h-12 flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#d96811] to-[#ff9d52] px-4">
                        <BookCopy className="w-5 h-5 text-white" />
                        My Courses
                    </h2>

                    <nav className="flex flex-col gap-4 text-lg text-gray-700 font-medium px-2 py-8">
                        <ValidateRedirection Component={Link} showIcon />
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
                <main className="flex-1 py-10 px-10 bg-[#f9fafb]">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-orange-500" />
                            My Courses
                        </h2>

                        {enrolledCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {enrolledCourses.map((course) => (
                                    <div key={course.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                                        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{course.description || "No description."}</p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            From: {course.start_date} &nbsp;|&nbsp; To: {course.end_date}
                                        </p>
                                        <Link
                                            href="#"
                                            className="inline-block mt-3 text-indigo-600 hover:underline text-sm"
                                        >
                                            View Course
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">You are not enrolled in any courses.</p>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
