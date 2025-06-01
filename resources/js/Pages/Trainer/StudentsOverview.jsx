import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    UserRound,
    Star,
    Award,
    BookCopy,
    Users,
} from "lucide-react";
import ValidateRedirection from "../Validation/ValidateRedirection";

export default function StudentsOverview({ auth, courses: initialCourses = [] }) {
    const [courses, setCourses] = useState(initialCourses);
    const [uniqueStudents, setUniqueStudents] = useState([]);

    useEffect(() => {
        const studentMap = new Map();

        courses.forEach(course => {
            (course.students || []).forEach(student => {
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

    return (
        <AuthenticatedLayout>
            <Head title="My Students" />

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="sticky top-0 h-screen w-64 bg-white shadow">
                    <h2 className="w-full h-12 flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#664D85] to-[#956EBD] px-4">
                        <Users className="w-5 h-5 text-white" />
                        My Students
                    </h2>

                    <nav className="flex flex-col gap-4 text-lg text-gray-700 font-medium px-2 py-8">
                        <ValidateRedirection Component={Link} showIcon />

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
                        <h2 className="text-2xl font-bold text-gray-800">
                            My Students{" "}
                            <span className="text-sm text-gray-500">
                                ({uniqueStudents.length})
                            </span>
                        </h2>

                        {uniqueStudents.length === 0 ? (
                            <p className="text-gray-600">
                                You currently have no students enrolled in your courses.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {uniqueStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition rounded-xl p-5 flex flex-col gap-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-100 p-2 rounded-full">
                                                <UserRound className="w-6 h-6 text-indigo-500" />
                                            </div>
                                            <div>
                                                <p className="text-md font-semibold text-gray-800">{student.name}</p>
                                                <p className="text-sm text-gray-500">{student.email}</p>
                                            </div>
                                        </div>

                                        <div className="border-t pt-3 text-sm text-gray-600">
                                            Enrolled in:{" "}
                                            <span className="font-medium text-gray-800">
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
