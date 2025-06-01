import { usePage } from "@inertiajs/react";
import { LayoutDashboard } from "lucide-react";

export default function ValidateRedirection({ Component, showIcon = false, welcome = false }) {
    const user = usePage().props.auth?.user;
    if (!user) return null;

    const href =
        user.role === "admin"
            ? "/dashboard"
            : user.role === "trainer"
                ? "/trainer-dashboard"
                : user.role === "student"
                    ? "/student-dashboard"
                    : "#";

    const currentPath = window.location.pathname;
    const active = currentPath === href;

    // Capitalize role
    const capitalizedRole = user.role.charAt(0).toUpperCase() + user.role.slice(1);

    return (
        <Component href={href} {...(active ? { active: true } : {})}>
            {welcome == false ? <span className="flex items-center gap-4 px-2 py-2 rounded hover:bg-indigo-100 transition">
                {showIcon && <LayoutDashboard className="w-5 h-5" />}
                <span>{capitalizedRole} Dashboard</span>
            </span> : <span className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                <span>{capitalizedRole} Dashboard</span>
            </span>}
        </Component>
    );
}
