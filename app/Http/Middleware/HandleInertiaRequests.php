<?php

namespace App\Http\Middleware;

use App\Models\Rule;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'is_admin' => $request->user()?->isAdmin() ?? false,
            ],
            'title' => config('app.name'),
            'flash' => function () use ($request) {
                return ['flash' => fn () => $request->session()->get('flash')];
            },
            'notifications_count' => function () use ($request) {
                if (! $request->user()) {
                    return 0;
                }

                return $request->user()->unreadNotifications()->count();
            },
            'authorizations' => function () use ($request) {
                if (! $request->user()) {
                    return [];
                }

                $user = $request->user();
                $user->loadMissing('permission.rules');

                $rules = [];

                if ($user->isAdmin()) {
                    foreach (Rule::where('control', 'like', '%viewAny%')->get() as $rule) {
                        $rules[str_replace('.', '_', $rule->control)] = true;
                    }
                } else {
                    foreach ($user->permission->rules()->where('control', 'like', '%viewAny%')->get() as $rule) {
                        $rules[str_replace('.', '_', $rule->control)] = true;
                    }
                }

                return $rules;
            },
        ];
    }
}
