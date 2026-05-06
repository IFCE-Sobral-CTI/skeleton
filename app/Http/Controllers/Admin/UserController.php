<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserPasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Permission;
use App\Models\User;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @throws AuthorizationException
     */
    public function index(Request $request): Response
    {
        $this->authorize('users.viewAny', User::class);

        return Inertia::render('Auth/User/Index', array_merge(User::search($request), [
            'can' => [
                'create' => $request->user()->can('users.create'),
                'view' => $request->user()->can('users.view'),
            ],
        ]));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @throws AuthorizationException
     */
    public function create(): Response
    {
        $this->authorize('users.create', User::class);

        return Inertia::render('Auth/User/Create', [
            'permissions' => Permission::select('id', 'description')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws AuthorizationException
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->authorize('users.create', User::class);

        $data = $request->validated();

        if (! $request->user()->isAdmin()) {
            $data['permission_id'] = Permission::where('description', '!=', 'Administrador')
                ->orderBy('id')->value('id');
        }

        $data['password'] = Hash::make($request->password);

        try {
            $user = User::create($data);

            return redirect()->route('users.show', $user)->with('flash', ['status' => 'success', 'message' => 'Registro salvo com sucesso.']);
        } catch (Exception $e) {
            return redirect()->route('users.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @throws AuthorizationException
     */
    public function show(Request $request, User $user): Response
    {
        $this->authorize('users.view', $user);

        return Inertia::render('Auth/User/Show', [
            'user' => User::with('permission')->find($user->id),
            'can' => [
                'update' => $request->user()->can('users.update'),
                'update_password' => $request->user()->can('users.update.password'),
                'delete' => $request->user()->can('users.delete'),
                'verify' => $request->user()->can('users.verify'),
            ],
        ]);
    }

    /**
     * Display profile user.
     *
     * @throws AuthorizationException
     */
    public function profile(): Response
    {
        $this->authorize('users.profile', User::class);

        $user = Auth::user();

        return Inertia::render('Auth/User/Profile', [
            'user' => User::with('permission')->find($user->id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @throws AuthorizationException
     */
    public function edit(User $user): Response
    {
        $this->authorize('users.update', $user);

        return Inertia::render('Auth/User/Edit', [
            'user' => $user,
            'permissions' => Permission::select('id', 'description')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @throws AuthorizationException
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $this->authorize('users.update', $user);

        $data = $request->validated();

        if (! $request->user()->isAdmin()) {
            unset($data['permission_id']);
        }

        try {
            $user->update($data);

            return redirect()->route('users.show', $user)->with('flash', ['status' => 'success', 'message' => 'Registro atualizado com sucesso!']);
        } catch (Exception $e) {
            return redirect()->route('users.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Verify the specified user by setting email_verified_at.
     *
     * @throws AuthorizationException
     */
    public function editPassword(User $user): Response
    {
        $this->authorize('users.update.password', $user);

        return Inertia::render('Auth/User/EditPassword', [
            'user' => $user,
        ]);
    }

    public function updatePassword(UpdateUserPasswordRequest $request, User $user): RedirectResponse
    {
        $this->authorize('users.update.password', $user);

        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        try {
            $user->update($data);

            return redirect()->route('users.show', $user)->with('flash', ['status' => 'success', 'message' => 'Registro atualizado com sucesso!']);
        } catch (Exception $e) {
            return redirect()->route('users.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    public function verify(User $user): RedirectResponse
    {
        $this->authorize('users.verify', $user);

        try {
            $user->update(['email_verified_at' => now()]);

            return redirect()->route('users.show', $user)->with('flash', ['status' => 'success', 'message' => 'Usuário validado com sucesso!']);
        } catch (Exception $e) {
            return redirect()->route('users.show', $user)->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws AuthorizationException
     */
    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('users.delete', $user);

        if ($user->isAdmin()) {
            return redirect()->route('users.index')->with('flash', ['status' => 'danger', 'message' => 'Erro ao tentar apagar o registro!']);
        }

        try {
            $user->delete();

            return redirect()->route('users.index')->with('flash', ['status' => 'success', 'message' => 'Registro apagado com sucesso!']);
        } catch (Exception $e) {
            return redirect()->route('users.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }
}
