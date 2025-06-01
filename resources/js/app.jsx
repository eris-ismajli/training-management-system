import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast'; // ✅ Toast system

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

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
                            background: '#ffffff',
                            color: '#333',
                            border: '1px solid #e5e7eb',
                            padding: '12px 16px',
                            fontSize: '14px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                            borderRadius: '8px',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10b981', 
                                secondary: '#d1fae5',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fee2e2',
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
