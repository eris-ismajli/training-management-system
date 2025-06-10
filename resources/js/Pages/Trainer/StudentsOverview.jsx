import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { UserRound, Star, Award, BookCopy, Users } from "lucide-react";
import ValidateRedirection from "../Validation/ValidateRedirection";

export default function StudentsOverview({
    auth,
    courses: initialCourses = [],
}) {
    const [courses, setCourses] = useState(initialCourses);
    const [uniqueStudents, setUniqueStudents] = useState([]);

    useEffect(() => {
        const studentMap = new Map();

        courses.forEach((course) => {
            (course.students || []).forEach((student) => {
                if (!studentMap.has(student.id)) {
                    studentMap.set(student.id, {
                        ...student,
                        courseTitles: [course.title],
                    });
                } else {
                    studentMap.get(student.id).courseTitles.push(course.title);
                }
            });
        });

        setUniqueStudents(Array.from(studentMap.values()));
    }, [courses]);

    const sidebarLinks = [
        {
            href: "/assigned-courses",
            label: "Assigned Courses",
            icon: BookCopy,
        },
    ];

    return (
        <AuthenticatedLayout sidebarLinks={sidebarLinks} currentLink={"My Students"} isDashboard={false}>
            <Head title="My Students" />

            <div className="flex min-h-screen bg-gray-50 dark:bg-[#1E1E2F] text-gray-900 dark:text-gray-100">
                <main className="flex-1 py-12 px-10">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            My Students{" "}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                ({uniqueStudents.length})
                            </span>
                        </h2>

                        {uniqueStudents.length === 0 ? (
                            <p className="text-gray-600 dark:text-gray-400">
                                You currently have no students enrolled in your courses.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {uniqueStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="bg-white dark:bg-[#2A2A3B] shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition rounded-xl p-5 flex flex-col gap-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                                                <UserRound className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                            </div>
                                            <div>
                                                <p className="text-md font-semibold text-gray-800 dark:text-white">
                                                    {student.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {student.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 text-sm text-gray-600 dark:text-gray-300">
                                            Enrolled in:{" "}
                                            <span className="font-medium text-gray-800 dark:text-white">
                                                {student.courseTitles.join(", ")}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
