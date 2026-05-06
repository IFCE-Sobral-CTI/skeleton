<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use LdapRecord\Container;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password view.
     */
    public function show(): Response
    {
        return Inertia::render('Auth/ConfirmPassword');
    }

    /**
     * Confirm the user's password.
     */
    public function store(Request $request): RedirectResponse
    {
        $confirmed = $this->ldapValidate($request) || $this->localValidate($request);

        if (! $confirmed) {
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        return redirect()->intended(route('dashboard', absolute: false));
    }

    protected function ldapValidate(Request $request): bool
    {
        $registry = $request->user()->registry;

        if (! $registry) {
            return false;
        }

        try {
            return Container::getDefaultConnection()->auth()->attempt(
                $registry.'@ad.ifce.edu.br',
                $request->password
            );
        } catch (\Throwable $e) {
            return false;
        }
    }

    protected function localValidate(Request $request): bool
    {
        return Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ]);
    }
}
