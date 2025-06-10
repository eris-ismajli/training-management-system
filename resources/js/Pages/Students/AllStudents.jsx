import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BookCopy, BookPlus, Users, UserPlus, UserRound, GraduationCap } from "lucide-react";

export default function Index({ students }) {
    const sidebarLinks = [
        { href: "/courses", label: "All Courses", icon: BookCopy },
        { href: "/courses/create", label: "Add Course", icon: BookPlus },
        { href: "/users", label: "All Users", icon: Users },
        { href: "/users/create", label: "Add Users", icon: UserPlus },
    ];

    return (
        <AuthenticatedLayout
            sidebarLinks={sidebarLinks}
            currentLink={"All Students"}
            isDashboard={false}
        >
            <Head title="All Trainers" />
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-green-500" />
                    All Students
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {students.map((student) => (
                        <div
                            key={student.id}
                            className="bg-white dark:bg-[#2A2A3B] rounded-xl shadow p-5 flex items-center"
                        >
                            {/* Avatar on the left */}
                            <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                                <UserRound className="w-6 h-6 text-indigo-500" />
                            </div>

                            {/* Trainer Info on the right */}
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {student.name}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
                                    {student.email}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-400">
                                    Role:{" "}
                                    <span className="text-indigo-600 dark:text-indigo-400">
                                        {student.role}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
