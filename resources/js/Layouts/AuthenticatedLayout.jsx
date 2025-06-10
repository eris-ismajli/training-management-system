import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import ValidateRedirection from "@/Pages/Validation/ValidateRedirection";
import { Link, usePage } from "@inertiajs/react"; // ✅ include usePage
import { useState, useEffect } from "react";
import {
    CircleUser,
    Moon,
    Sun,
    LayoutDashboard,
    BookCopy,
    BookPlus,
    Users,
    UserPlus,
    SquarePen,
    UserPen,
    GraduationCap,
} from "lucide-react";

const currentIcon = {
    Dashboard: <LayoutDashboard className="w-5 h-5 text-white" />,
    "All Courses": <BookCopy className="w-5 h-5 text-white" />,
    "Add Course": <BookPlus className="w-5 h-5 text-white" />,
    "All Users": <Users className="w-5 h-5 text-white" />,
    "Add Users": <UserPlus className="w-5 h-5 text-white" />,
    "Edit Course": <SquarePen className="w-5 h-5 text-white" />,
    "Edit User": <UserPen className="w-5 h-5 text-white" />,
    "Profile": <CircleUser className="w-5 h-5 text-white" />,
    "My Students": <Users className="w-5 h-5 text-white" />,
    "Assigned Courses": <BookCopy className="w-5 h-5 text-white" />,
    "My Courses": <BookCopy className="w-5 h-5 text-white" />,
    "All Trainers": <Users className="w-5 h-5 text-white" />,
    "All Students": <GraduationCap className="w-5 h-5 text-white" />,
};

export default function AuthenticatedLayout({
    header,
    children,
    sidebarLinks = [],
    currentLink,
    isDashboard,
}) {
    const user = usePage().props.auth.user;

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    function Sidebar({ links }) {
        return (
            <aside className="sticky top-0 h-screen w-64 bg-white dark:bg-[#2A2A3B] shadow">
                <h2 className="h-12 mt-2 w-[95%] mx-auto flex items-center gap-2 text-xl font-semibold text-white bg-gradient-to-r from-[#4c64c0] to-[#5aaee0] px-4 rounded-md">
                    {currentIcon[currentLink]}
                    {currentLink}
                    {console.log(currentLink)}
                </h2>

                <nav className="flex flex-col gap-4 text-lg text-gray-700 dark:text-gray-200 font-medium px-2 pt-4">
                    {!isDashboard ? (
                        <ValidateRedirection Component={Link} showIcon />
                    ) : null}
                    {links?.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
                        >
                            {link.icon && <link.icon className="w-5 h-5" />}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        );
    }

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <div className="min-h-screen bg-[#f5f9fa] text-gray-900  dark:bg-[#1E1E2F] dark:text-white">
            {/* Navigation */}
            <nav className="bg-white dark:bg-[#2A2A3B] shadow-sm dark:shadow-[0_1px_4px_rgba(0,0,0,0.15)] relative z-10">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left */}
                        <div className="flex items-center gap-8">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-white" />
                            </Link>
                            <ValidateRedirection Component={NavLink} />
                            <span className="text-mg font-semibold text-gray-600 dark:text-gray-500 select-none">
                                Training Management System
                            </span>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-4">
                            {/* Theme toggle button */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                title="Toggle theme"
                            >
                                {theme === "dark" ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </button>

                            {/* Profile dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2A2A3B] px-3 py-2 text-sm font-medium leading-4 text-gray-700 dark:text-gray-200 transition hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <CircleUser className="w-5 h-5 mr-2" />
                                            {user.name}
                                            <svg
                                                className="ml-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content className=" border border-gray-200 dark:border-gray-700 shadow-md rounded-md overflow-hidden">
                                    <Dropdown.Link
                                        href={route("profile.edit")}
                                        className="bg-white dark:bg-[#2A2A3B] block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 "
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="bg-white dark:bg-[#2A2A3B] block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                <Sidebar links={sidebarLinks} />
                <div className="flex-1">
                    {header && (
                        <header className="bg-white dark:bg-[#2A2A3B] shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
