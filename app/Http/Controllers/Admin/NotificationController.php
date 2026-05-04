<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendNotificationRequest;
use App\Mail\NotificationMail;
use App\Models\Notification;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorize('notifications.viewAny', Notification::class);

        return Inertia::render('Auth/Notification/Manage', array_merge(
            Notification::search($request),
            [
                'type' => $request->type ?? '',
                'can' => [
                    'create' => $request->user()->can('notifications.create'),
                    'view' => $request->user()->can('notifications.view'),
                ],
            ]
        ));
    }

    public function create(Request $request): Response
    {
        $this->authorize('notifications.create', Notification::class);

        return Inertia::render('Auth/Notification/Send', [
            'users' => $this->getUsersList(),
            'permissions' => $this->getPermissionsList(),
        ]);
    }

    public function store(SendNotificationRequest $request): RedirectResponse
    {
        $this->authorize('notifications.create', Notification::class);

        $validated = $request->validated();

        $recipients = match ($validated['target']) {
            'all' => User::all(),
            'permission' => User::where('permission_id', $validated['permission_id'])->get(),
            'users' => User::whereIn('id', $validated['user_ids'])->get(),
        };

        $notification = Notification::create([
            'title' => $validated['title'],
            'message' => $validated['message'],
            'type' => $validated['type'],
            'url' => $validated['url'] ?? null,
            'created_by' => $request->user()->id,
        ]);

        $notification->users()->attach($recipients->pluck('id'));

        if ($validated['send_email'] ?? false) {
            foreach ($recipients as $recipient) {
                Mail::to($recipient)->queue(new NotificationMail(
                    recipient: $recipient,
                    title: $validated['title'],
                    message: $validated['message'],
                    url: $validated['url'] ?? null,
                ));
            }
        }

        $count = $recipients->count();

        return to_route('notifications.index')
            ->with('flash', ['status' => 'success', 'message' => "Notificação enviada para {$count} usuário(s)."]);
    }

    public function show(Request $request, Notification $notification): Response
    {
        $this->authorize('notifications.view', $notification);

        $notification->load('users');

        return Inertia::render('Auth/Notification/Show', [
            'notification' => [
                'id' => $notification->id,
                'title' => $notification->title,
                'message' => $notification->message,
                'type' => $notification->type,
                'url' => $notification->url,
                'created_at' => $notification->created_at->format('d/m/Y H:i'),
            ],
            'recipients' => $notification->users->map(fn ($u) => [
                'id' => $u->pivot->id,
                'user_id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'read_at' => $u->pivot->read_at ? Carbon::parse($u->pivot->read_at)->format('d/m/Y H:i') : null,
                'is_read' => ! is_null($u->pivot->read_at),
            ]),
        ]);
    }

    public function edit(Request $request, Notification $notification): Response
    {
        $this->authorize('notifications.update', $notification);

        return Inertia::render('Auth/Notification/Edit', [
            'notification' => [
                'id' => $notification->id,
                'title' => $notification->title,
                'message' => $notification->message,
                'type' => $notification->type,
                'url' => $notification->url ?? '',
            ],
        ]);
    }

    public function update(Request $request, Notification $notification): RedirectResponse
    {
        $this->authorize('notifications.update', $notification);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:1000'],
            'type' => ['required', 'in:info,success,warning,danger'],
            'url' => ['nullable', 'url', 'max:500'],
        ], [
            'title.required' => 'O título é obrigatório.',
            'title.max' => 'O título deve ter no máximo 255 caracteres.',
            'message.required' => 'A mensagem é obrigatória.',
            'message.max' => 'A mensagem deve ter no máximo 1000 caracteres.',
            'type.required' => 'Selecione o tipo.',
            'type.in' => 'Tipo inválido.',
            'url.url' => 'O link deve ser uma URL válida.',
            'url.max' => 'O link deve ter no máximo 500 caracteres.',
        ]);

        $notification->update($validated);

        return to_route('notifications.show', $notification->id)
            ->with('flash', ['status' => 'success', 'message' => 'Notificação atualizada.']);
    }

    public function resend(Request $request, string $id): Response
    {
        $this->authorize('notifications.resend', Notification::class);

        $notification = Notification::findOrFail($id);

        return Inertia::render('Auth/Notification/Send', [
            'users' => $this->getUsersList(),
            'permissions' => $this->getPermissionsList(),
            'prefill' => [
                'title' => $notification->title,
                'message' => $notification->message,
                'type' => $notification->type,
                'url' => $notification->url ?? '',
            ],
        ]);
    }

    public function destroy(Request $request, Notification $notification): RedirectResponse
    {
        $this->authorize('notifications.delete', $notification);

        $notification->delete();

        return to_route('notifications.index')
            ->with('flash', ['status' => 'success', 'message' => 'Notificação excluída.']);
    }

    private function getUsersList()
    {
        return User::orderBy('name')->get(['id', 'name', 'email'])
            ->map(fn ($u) => ['id' => $u->id, 'name' => $u->name, 'email' => $u->email]);
    }

    private function getPermissionsList()
    {
        return Permission::orderBy('description')->get(['id', 'description'])
            ->map(fn ($p) => ['id' => $p->id, 'name' => $p->description]);
    }
}
