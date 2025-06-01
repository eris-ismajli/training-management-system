<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'courses' => Course::count(),
                'trainers' => User::where('role', 'trainer')->count(),
                'students' => User::where('role', 'student')->count(),
            ]
        ]);
    }
}
