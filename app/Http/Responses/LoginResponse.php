<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Auth;

class LoginResponse implements LoginResponseContract
{
public function toResponse($request)
{
    $role = Auth::user()->role;

    return match ($role) {
        'trainer' => redirect()->route('trainer.dashboard'),
        'student' => redirect()->route('student.dashboard'),
        default   => redirect()->route('dashboard'), // admin or fallback
    };
}

}
