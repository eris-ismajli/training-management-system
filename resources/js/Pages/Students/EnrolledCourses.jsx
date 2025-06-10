import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { BookOpen } from "lucide-react";
import ValidateRedirection from "../Validation/ValidateRedirection";

export default function EnrolledCourses({ auth, enrolledCourses = [] }) {
    return (
        <AuthenticatedLayout currentLink={"My Courses"} isDashboard={false}>
            <Head title="My Courses" />

            <div className="flex min-h-screen bg-[#f9fafb] dark:bg-[#1E1E2F] text-gray-900 dark:text-gray-100">
                {/* Main Content */}
                <main className="flex-1 py-10 px-10">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-orange-500" />
                            My Courses
                        </h2>

                        {enrolledCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {enrolledCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="bg-white dark:bg-[#2A2A3B] p-6 rounded-lg shadow hover:shadow-md dark:shadow-sm dark:hover:shadow-md transition"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {course.description ||
                                                "No description."}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            From: {course.start_date}{" "}
                                            &nbsp;|&nbsp; To: {course.end_date}
                                        </p>
                                        <Link
                                            href="#"
                                            className="inline-block mt-3 text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                                        >
                                            View Course
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                                You are not enrolled in any courses.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
