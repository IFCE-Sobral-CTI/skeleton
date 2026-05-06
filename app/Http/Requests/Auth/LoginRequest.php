<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use LdapRecord\Container;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'registry' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $authenticated = $this->attemptLdapOrLocal();

        if (! $authenticated) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'registry' => trans('auth.failed'),
            ]);
        }

        RateLimiter::clear($this->throttleKey());
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

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'registry' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('registry')).'|'.$this->ip());
    }
}
