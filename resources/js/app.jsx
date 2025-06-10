import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Detect if dark mode is enabled
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        duration: 2000,
                        style: {
                            background: prefersDark ? '#1f2937' : '#ffffff', // dark: gray-800
                            color: prefersDark ? '#f3f4f6' : '#333333',      // dark: gray-100
                            border: `1px solid ${prefersDark ? '#374151' : '#e5e7eb'}`, // dark: gray-700
                            padding: '12px 16px',
                            fontSize: '14px',
                            boxShadow: prefersDark
                                ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                                : '0 4px 12px rgba(0, 0, 0, 0.05)',
                            borderRadius: '8px',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10b981',
                                secondary: prefersDark ? '#064e3b' : '#d1fae5',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: prefersDark ? '#7f1d1d' : '#fee2e2',
                            },
                        },
                    }}
                />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
