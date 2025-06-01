import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import ValidateRedirection from '../Validation/ValidateRedirection';
import toast from 'react-hot-toast';

export default function Edit({ course }) {
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        title: course.title || '',
        description: course.description || '',
        start_date: course.start_date || '',
        end_date: course.end_date || '',
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        put(`/courses/${course.id}`, {
            onSuccess: () => router.visit('/courses'),
        });
        toast.success('Course edited successfully');

    };


    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this course?')) {
            router.delete(`/courses/${course.id}`, {
                onSuccess: () => router.visit('/courses'),
            });
            toast.success('Course deleted successfully');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Course
                    </h2>
                    <div className="flex gap-6 text-gray-800 text-lg font-medium">
                        <ValidateRedirection Component={Link} />
                        <Link href="/courses" className="hover:underline">All Courses</Link>
                    </div>
                </div>
            }
        >
            <Head title="Edit Course" />

            <div className="max-w-2xl mx-auto p-6">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block font-medium text-sm text-gray-700">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-md"
                            placeholder="Course Title"
                        />
                        {errors.title && <div className="text-sm text-red-500 mt-1">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block font-medium text-sm text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-md"
                            rows="4"
                            placeholder="Course Description"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium text-sm text-gray-700">Start Date</label>
                            <input
                                type="date"
                                value={data.start_date}
                                onChange={e => setData('start_date', e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium text-sm text-gray-700">End Date</label>
                            <input
                                type="date"
                                value={data.end_date}
                                onChange={e => setData('end_date', e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-md"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                        >
                            Delete Course
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
