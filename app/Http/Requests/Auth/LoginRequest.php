<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use LdapRecord\Container;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        if ($this->isLdapMode()) {
            return [
                'registry' => ['required', 'string'],
                'password' => ['required', 'string'],
            ];
        }

        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'registry.required' => 'O campo de matrícula é obrigatório.',
            'registry.string' => 'O campo de matrícula deve ser uma string.',
            'password.required' => 'O campo de senha é obrigatório.',
            'password.string' => 'O campo de senha deve ser uma string.',
            'email.required' => 'O campo de email é obrigatório.',
            'email.string' => 'O campo de email deve ser uma string.',
            'email.email' => 'O campo de email deve ser um endereço de email válido.',
        ];
    }

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $authenticated = $this->isLdapMode()
            ? $this->attemptLdapOrLocal()
            : $this->attemptEloquent();

        if (! $authenticated) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                $this->loginField() => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    protected function isLdapMode(): bool
    {
        return env('AUTH_MODE') === 'ldap';
    }

    protected function loginField(): string
    {
        return $this->isLdapMode() ? 'registry' : 'email';
    }

    protected function attemptEloquent(): bool
    {
        return Auth::attempt(
            $this->only('email', 'password'),
            $this->boolean('remember')
        );
    }

    protected function attemptLdapOrLocal(): bool
    {
        $localUser = User::where('registry', $this->registry)->first();

        if (! $localUser) {
            return false;
        }

        if ($this->attemptLdapBind()) {
            Auth::login($localUser, $this->boolean('remember'));

            return true;
        }

        return Auth::attempt([
            'registry' => $this->registry,
            'password' => $this->password,
        ], $this->boolean('remember'));
    }

    protected function attemptLdapBind(): bool
    {
        try {
            return Container::getDefaultConnection()->auth()->attempt(
                $this->registry.'@ad.ifce.edu.br',
                $this->password
            );
        } catch (\Throwable $e) {
            Log::error('LDAP bind error: '.$e->getMessage(), [
                'registry' => $this->registry,
            ]);

            report($e);

            return false;
        }
    }

    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            $this->loginField() => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string($this->loginField())).'|'.$this->ip());
    }
}
