import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { X, Star, Award, BookCopy, Users, UserRound } from "lucide-react";
import ValidateRedirection from "../Validation/ValidateRedirection";

import toast from "react-hot-toast";

function getCsrfToken() {
    return (
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || ""
    );
}

export default function AssignedCourses({ courses: initialCourses, auth }) {
    const [courses, setCourses] = useState([]);
    const [suggestions, setSuggestions] = useState({});
    const [searchInputs, setSearchInputs] = useState({});

    const page = usePage();
    const currentUserId = page.props.auth?.user?.id;

    // Load courses on initial mount
    useEffect(() => {
        setCourses(initialCourses);
    }, [initialCourses]);

    // Reset all state if user switches
    useEffect(() => {
        setCourses(initialCourses);
        setSearchInputs({});
        setSuggestions({});
    }, [currentUserId]);

    const handleStudentSearch = (courseId, query) => {
        setSearchInputs((prev) => ({ ...prev, [courseId]: query }));

        if (query.length < 2) {
            setSuggestions((prev) => ({ ...prev, [courseId]: [] }));
            return;
        }

        fetch(`/students/search?q=${encodeURIComponent(query)}`)
            .then((res) => res.json())
            .then((data) => {
                const alreadyEnrolledEmails = (
                    courses.find((c) => c.id === courseId)?.students || []
                ).map((s) => s.email);
                const filtered = data.filter(
                    (student) => !alreadyEnrolledEmails.includes(student.email)
                );
                setSuggestions((prev) => ({ ...prev, [courseId]: filtered }));
            });
    };

    const selectSuggestion = (courseId, email) => {
        setSearchInputs((prev) => ({ ...prev, [courseId]: email }));
        setSuggestions((prev) => ({ ...prev, [courseId]: [] })); // 👈 closes dropdown
    };

    const enrollStudent = async (courseId, email) => {
        const res = await fetch(`/courses/${courseId}/enroll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": getCsrfToken(),
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Enrollment failed.");
            return;
        }

        setCourses((prev) =>
            prev.map((course) =>
                course.id === courseId
                    ? {
                          ...course,
                          students: [...(course.students || []), data.student],
                      }
                    : course
            )
        );

        setSearchInputs((prev) => ({ ...prev, [courseId]: "" }));
        setSuggestions((prev) => ({ ...prev, [courseId]: [] }));

        toast.success("Student enrolled successfully");
    };

    const unenrollStudent = async (courseId, studentId) => {
        const res = await fetch(`/courses/${courseId}/unenroll/${studentId}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": getCsrfToken(),
            },
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to unenroll student.");
            return;
        }

        setCourses((prev) =>
            prev.map((course) =>
                course.id === courseId
                    ? {
                          ...course,
                          students: course.students.filter(
                              (s) => s.id !== studentId
                          ),
                      }
                    : course
            )
        );

        toast.success("Student removed successfully");
    };

    const sidebarLinks = [
        { href: "/trainer/students", label: "My Students", icon: Users },
    ];

    return (
        <AuthenticatedLayout
            sidebarLinks={sidebarLinks}
            currentLink={"Assigned Courses"}
            isDashboard={false}
        >
            <Head title="Assigned Courses" />
            <div className="flex min-h-screen bg-gray-50 dark:bg-[#1E1E2F] text-gray-900 dark:text-gray-100">
                <main className="flex-1 py-12 px-8 max-w-6xl mx-auto space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Your Assigned Courses
                    </h2>

                    {courses.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400">
                            You have no assigned courses.
                        </p>
                    ) : (
                        <div className="space-y-10">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white dark:bg-[#2A2A3B] rounded-xl shadow p-6 space-y-6 border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {course.start_date} →{" "}
                                            {course.end_date}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Category:{" "}
                                            <span className="font-medium text-gray-800 dark:text-gray-200">
                                                {course.category}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Description:{" "}
                                            {course.description || "N/A"}
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const email =
                                                searchInputs[course.id] || "";
                                            enrollStudent(course.id, email);
                                        }}
                                        className="space-y-2"
                                    >
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Enroll Student by Email:
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={
                                                    searchInputs[course.id] ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    handleStudentSearch(
                                                        course.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white px-3 py-2 rounded w-64 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                                                placeholder="Enter student email"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded"
                                            >
                                                Enroll
                                            </button>
                                        </div>

                                        {suggestions[course.id]?.length > 0 && (
                                            <ul className="absolute z-10 mt-1 bg-white dark:bg-[#2A2A3B] border border-gray-200 dark:border-gray-700 rounded w-64 shadow text-sm text-gray-900 dark:text-gray-100">
                                                {suggestions[course.id].map(
                                                    (student) => (
                                                        <li
                                                            key={student.id}
                                                            onClick={() =>
                                                                selectSuggestion(
                                                                    course.id,
                                                                    student.email
                                                                )
                                                            }
                                                            className="px-3 py-1 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
                                                        >
                                                            {student.email}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </form>

                                    {course.students?.length > 0 && (
                                        <div className="space-y-3">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                Enrolled Students:
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {course.students.map(
                                                    (student) => (
                                                        <div
                                                            key={student.id}
                                                            className="flex items-center justify-between bg-gray-100 dark:bg-[#3A3A4C] border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2"

                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                                                                    <UserRound className="w-5 h-5 text-indigo-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {
                                                                            student.email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    unenrollStudent(
                                                                        course.id,
                                                                        student.id
                                                                    )
                                                                }
                                                                className="text-red-500 hover:text-red-700"
                                                                title="Unenroll"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
