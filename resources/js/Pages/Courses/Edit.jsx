import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import ValidateRedirection from "../Validation/ValidateRedirection";
import toast from "react-hot-toast";
import { BookCopy } from "lucide-react";

export default function Edit({ course }) {
    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        title: course.title || "",
        description: course.description || "",
        start_date: course.start_date || "",
        end_date: course.end_date || "",
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        put(`/courses/${course.id}`, {
            onSuccess: () => router.visit("/courses"),
        });
        toast.success("Course edited successfully");
    };

    const handleDelete = () => {
        router.delete(`/courses/${course.id}`, {
            onSuccess: () => router.visit("/courses"),
        });
        toast.success("Course deleted successfully");
    };

    const sidebarLinks = [
        { href: "/courses", label: "All Courses", icon: BookCopy },
    ];

    return (
        <AuthenticatedLayout
            sidebarLinks={sidebarLinks}
            currentLink={"Edit Course"}
            isDashboard={false}
        >
            <Head title="Edit Course" />

            <div className="max-w-2xl mx-auto p-6 bg-gray-100 dark:bg-[#2A2A3B] text-gray-900 dark:text-white shadow rounded mt-10">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">
                            Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            placeholder="Course Title"
                        />
                        {errors.title && (
                            <div className="text-sm text-red-500 mt-1">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            rows="4"
                            placeholder="Course Description"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData("start_date", e.target.value)
                                }
                                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium text-sm text-gray-700 dark:text-gray-200">
                                End Date
                            </label>
                            <input
                                type="date"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData("end_date", e.target.value)
                                }
                                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E2F] text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete Course
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
