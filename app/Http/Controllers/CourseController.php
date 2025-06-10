<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with(['trainer', 'students'])->get(); // 👈 include 'students'
        $trainers = User::where('role', 'trainer')->select('id', 'name')->get();

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'trainers' => $trainers,
        ]);
    }


    public function create()
    {
        $trainers = User::where('role', 'trainer')->select('id', 'name')->get();

        return Inertia::render('Courses/Create', [
            'trainers' => $trainers,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'category' => 'required|string',
            'trainer_id' => 'nullable|exists:users,id', // ✅ Accept trainer from dropdown
        ]);

        Course::create($data); // No longer assigning current user as trainer

        return redirect()->route('courses.index');
    }

    public function edit(Course $course)
    {
        $trainers = User::where('role', 'trainer')->select('id', 'name')->get();

        return Inertia::render('Courses/Edit', [
            'course' => $course->load('trainer'),
            'trainers' => $trainers,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'trainer_id' => 'nullable|exists:users,id',
        ]);

        $course->update($data);

        return redirect()->route('courses.index');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('courses.index');
    }

    public function assignTrainer(Request $request, Course $course)
    {
        $data = $request->validate([
            'trainer_id' => 'required|exists:users,id',
        ]);

        $course->trainer_id = $data['trainer_id'];
        $course->save();

        return back();
    }

    public function enrollStudent(Request $request, Course $course)
    {
        $data = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $student = User::where('email', $data['email'])->where('role', 'student')->first();

        if (!$student) {
            return response()->json(['error' => 'User must be a registered student.'], 422);
        }

        if ($course->students()->where('user_id', $student->id)->exists()) {
            return response()->json(['error' => 'Student is already enrolled.'], 422);
        }

        $course->students()->attach($student->id);

        return response()->json([
            'message' => 'Student enrolled successfully!',
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'email' => $student->email,
            ]
        ]);
    }


    public function unenrollStudent(Course $course, User $user)
    {
        if (!$course->students()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'User is not enrolled.'], 422);
        }

        $course->students()->detach($user->id);

        return response()->json([
            'message' => 'Student unenrolled successfully!',
            'student_id' => $user->id,
        ]);
    }


    public function myCourses()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return Inertia::render('Students/EnrolledCourses', [
            'auth' => [
                'user' => $user,
            ],
            'enrolledCourses' => $user->enrolledCourses()
                ->select('courses.id', 'title', 'description', 'start_date', 'end_date')
                ->get(),

        ]);
    }

    public function allTrainers()
    {
        $trainers = User::where('role', 'trainer')->get();

        return Inertia::render('Trainer/Trainers', [
            'trainers' => $trainers
        ]);
    }

    public function allStudents()
    {
        $students = User::where('role', 'student')->get();

        return Inertia::render('Students/AllStudents', [
            'students' => $students
        ]);
    }
}
