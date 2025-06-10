<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// 🧑‍💼 Admin dashboard
Route::get('/dashboard', function () {
    $courseGrowth = Course::selectRaw('DATE(created_at) as date, COUNT(*) as count')
        ->groupBy('date')
        ->orderBy('date')
        ->get();

    $categoryCounts = Course::select('category', DB::raw('count(*) as count'))
        ->groupBy('category')
        ->get();

    return Inertia::render('Dashboard', [
        'stats' => [
            'courses' => Course::count(),
            'users' => User::count(),
            'students' => User::where('role', 'student')->count(), 
            'trainers' => User::where('role', 'trainer')->count(), 
        ],
        'course_growth' => $courseGrowth,
        'category_distribution' => $categoryCounts,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/trainer-dashboard', function () {
    $trainerId = Auth::id();

    // Load assigned courses with students
    $assignedCourses = Course::where('trainer_id', $trainerId)
        ->with('students')
        ->get();

    // Get unique students across all assigned courses
    $uniqueStudents = collect();
    foreach ($assignedCourses as $course) {
        foreach ($course->students as $student) {
            $uniqueStudents->put($student->id, $student);
        }
    }

    return Inertia::render('TrainerDashboard', [
        'assignedCourseCount' => $assignedCourses->count(),
        'assignedCourses' => $assignedCourses,
        'uniqueStudentCount' => $uniqueStudents->count(), // ✅ include it here
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth'])->name('trainer.dashboard');

Route::get('/assigned-courses', function () {
    $trainerId = Auth::id();

    $assignedCourses = Course::where('trainer_id', $trainerId)
        ->with(['trainer', 'students']) // Make sure to eager-load students
        ->get();

    // Collect all students from assigned courses, ensure uniqueness by ID
    $uniqueStudents = collect();
    foreach ($assignedCourses as $course) {
        foreach ($course->students as $student) {
            $uniqueStudents->put($student->id, $student);
        }
    }

    return Inertia::render('Trainer/AssignedCourses', [
        'courses' => $assignedCourses,
        'auth' => [
            'user' => Auth::user(),
        ],
        'uniqueStudentCount' => $uniqueStudents->count(),
    ]);
})->middleware(['auth'])->name('courses.assigned');

Route::get('/student-dashboard', function () {
    $user = Auth::user();

    return Inertia::render('StudentDashboard', [
        'auth' => [
            'user' => $user,
        ],
        'enrolledCourses' => $user->enrolledCourses()->select('courses.id', 'title')->get(),
        'progressStats' => [
            'average' => 72, // Example
            'deadlines' => 2,
            'courses' => [], // Optional dummy progress data
        ],
    ]);
})->middleware(['auth'])->name('student.dashboard');


// 🔒 Authenticated routes
Route::middleware('auth')->group(function () {
    // Profile management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Course management
    Route::resource('courses', CourseController::class);

    // User management
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

// ✅ Custom login route with role-based redirect
Route::post('/custom-login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();

        $role = Auth::user()->role;

        return match ($role) {
            'trainer' => redirect()->route('trainer.dashboard'),
            'student' => redirect()->route('student.dashboard'),
            default   => redirect()->route('dashboard'),
        };
    }

    return back()->withErrors([
        'email' => 'The provided credentials are incorrect.',
    ]);
});


Route::get('/students/search', function (\Illuminate\Http\Request $request) {
    $query = $request->get('q');

    return User::where('role', 'student')
        ->where('email', 'like', '%' . $query . '%')
        ->select('id', 'email')
        ->limit(5)
        ->get();
})->middleware(['auth'])->name('students.search');

Route::get('/enrolled-courses', [CourseController::class, 'myCourses'])
    ->middleware(['auth', 'verified'])
    ->name('students.enrolled');



Route::get('/trainer/students', function () {
    $trainerId = Auth::id();

    // Get all students in courses assigned to the logged-in trainer
    $courses = \App\Models\Course::with('students')
        ->where('trainer_id', $trainerId)
        ->get();

    return Inertia::render('Trainer/StudentsOverview', [
        'courses' => $courses,
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth'])->name('trainer.students');

Route::get('/trainers', [CourseController::class, 'allTrainers'])->name('trainer.trainers');
Route::get('/students', [CourseController::class, 'allStudents'])->name('students.allStudents');

Route::put('/courses/{course}/assign-trainer', [CourseController::class, 'assignTrainer'])->name('courses.assignTrainer');
Route::post('/courses/{course}/enroll', [CourseController::class, 'enrollStudent'])->name('courses.enroll');
Route::delete('/courses/{course}/unenroll/{user}', [CourseController::class, 'unenrollStudent'])->name('courses.unenroll');



require __DIR__ . '/auth.php';
