<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use App\Models\Rule;
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
    public function version(Request $request): string|null
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
            ],
            'title' => config('app.name'),
            'flash' => function () use ($request) {
                return ['flash' => fn () => $request->session()->get('flash')];
            },
            'authorizations' => function () use ($request) {
                if (!$request->user())
                    return [];

                $rules = [];

                if ($request->user()->isAdmin()) {
                    foreach(Rule::where('control', 'like', '%viewAny%')->get() as $rule) {
                        $rules[str_replace('.', '_', $rule->control)] = true;
                    }
                } else {
                    foreach($request->user()->permission->rules()->where('control', 'like', '%viewAny%')->get() as $rule) {
                        $rules[str_replace('.', '_', $rule->control)] = true;
                    }
                }

                return $rules;
            },
        ];
    }
}
