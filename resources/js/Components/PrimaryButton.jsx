export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`inline-flex items-center rounded-md border border-transparent
                bg-gray-800 dark:bg-indigo-600
                px-4 py-2 text-xs font-semibold uppercase tracking-widest
                text-white
                transition duration-150 ease-in-out
                hover:bg-gray-700 dark:hover:bg-indigo-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                active:bg-gray-900 dark:active:bg-indigo-700
                ${disabled ? 'opacity-25 cursor-not-allowed' : ''}
                ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
