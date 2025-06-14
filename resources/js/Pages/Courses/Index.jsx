import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    cardClass,
    modalClass,
    inputClass,
    selectClass,
} from "@/Styles/ClassNames";
import ValidateRedirection from "../Validation/ValidateRedirection";
import { useState, useEffect } from "react";
import { X, BookCopy, BookPlus, UserRound } from "lucide-react";

import toast from "react-hot-toast";

function getCsrfToken() {
    return (
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || ""
    );
}

export default function Index({ courses: initialCourses, trainers }) {
    const [courses, setCourses] = useState([]);
    const [suggestions, setSuggestions] = useState({});
    const [searchInputs, setSearchInputs] = useState({});
    const { delete: destroy } = useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const page = usePage();
    const currentUserId = page.props.auth?.user?.id;

    useEffect(() => {
        setCourses(initialCourses);
    }, [initialCourses]);

    // Reset state when user changes
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
        setSuggestions((prev) => ({ ...prev, [courseId]: [] }));
    };

    const enrollStudent = async (e, courseId) => {
        e.preventDefault();
        const email = searchInputs[courseId] || "";

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

        const newStudent = data.student;

        setCourses((prev) =>
            prev.map((course) =>
                course.id === courseId
                    ? {
                          ...course,
                          students: [...(course.students || []), newStudent],
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

    const deleteCourse = (id) => {
        destroy(`/courses/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setCourses((prev) => prev.filter((c) => c.id !== id));
            },
        });

        toast.success("Course deleted successfully");
    };

    const sidebarLinks = [
        { href: "/courses/create", label: "Add Course", icon: BookPlus },
    ];

    return (
        <AuthenticatedLayout
            sidebarLinks={sidebarLinks}
            currentLink={"All Courses"}
            isDashboard={false}
        >
            <Head title="All Courses" />
            <div className="flex min-h-screen">
                <main className="flex-1 p-10 max-w-6xl mx-auto space-y-10">
                    {courses.length === 0 ? (
                        <p className="text-gray-600">No courses available.</p>
                    ) : (
                        courses.map((course) => (
                            <div key={course.id} className={cardClass}>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-semibold text-indigo-700 dark:text-cyan-600">
                                                {course.title}
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {course.start_date} →{" "}
                                                {course.end_date}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Assigned Trainer:{" "}
                                                <span className="font-medium">
                                                    {course.trainer
                                                        ? course.trainer.name
                                                        : "None"}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex gap-4 text-sm">
                                            <Link
                                                href={`/courses/${course.id}/edit`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setCourseToDelete(
                                                        course.id
                                                    );
                                                    setModalOpen(true);
                                                }}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <select
                                        className={selectClass}
                                        defaultValue={course.trainer_id || ""}
                                        onChange={(e) => {
                                            const trainerId = e.target.value;
                                            fetch(
                                                `/courses/${course.id}/assign-trainer`,
                                                {
                                                    method: "PUT",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                        "X-CSRF-TOKEN":
                                                            getCsrfToken(), // ✅ Safe and consistent
                                                    },
                                                    body: JSON.stringify({
                                                        trainer_id: trainerId,
                                                    }),
                                                }
                                            );
                                        }}
                                    >
                                        <option value="" disabled>
                                            Select trainer
                                        </option>
                                        {trainers.map((trainer) => (
                                            <option
                                                key={trainer.id}
                                                value={trainer.id}
                                            >
                                                {trainer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <form
                                    onSubmit={(e) =>
                                        enrollStudent(e, course.id)
                                    }
                                    className="relative space-y-1"
                                >
                                    <label className="text-sm text-gray-600 dark:text-gray-400">
                                        Enroll Student by Email:
                                    </label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            name="email"
                                            value={
                                                searchInputs[course.id] || ""
                                            }
                                            onChange={(e) =>
                                                handleStudentSearch(
                                                    course.id,
                                                    e.target.value
                                                )
                                            }
                                            className={inputClass}
                                            placeholder="Student email"
                                            autoComplete="off"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
                                        >
                                            Enroll
                                        </button>
                                    </div>

                                    {suggestions[course.id]?.length > 0 && (
                                        <ul className="absolute z-10 mt-1 w-64 rounded border shadow text-sm bg-white dark:bg-[#2A2A3B] border-gray-200 dark:border-gray-700">
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
                                                        className="px-3 py-1 cursor-pointer hover:bg-indigo-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
                                                    >
                                                        {student.email}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </form>

                                {course.students &&
                                    course.students.length > 0 && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 mt-4">
                                                Enrolled Students:
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {course.students.map(
                                                    (student) => (
                                                        <div
                                                            key={student.id}
                                                            className="flex items-center justify-between bg-gray-100/80 dark:bg-[#3A3A4C]/60 border border-gray-100 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 shadow-sm"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="bg-indigo-100 p-2 rounded-full">
                                                                    <UserRound className="w-5 h-5 text-indigo-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
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
                        ))
                    )}
                </main>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[#2A2A3B] rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Delete Course
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete this course? This
                            action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 dark:bg-[#3A3A4C] text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (courseToDelete) {
                                        deleteCourse(courseToDelete);
                                        setModalOpen(false);
                                        setCourseToDelete(null);
                                    }
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
