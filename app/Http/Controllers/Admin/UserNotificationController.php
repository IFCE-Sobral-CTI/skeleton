<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UserNotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $query = $request->filter === 'unread'
            ? $request->user()->unreadNotifications()
            : $request->user()->notifications();

        return Inertia::render('Auth/Notification/Index', [
            'notifications' => $query->paginate(config('app.pagination', 10)),
            'unread_count' => $request->user()->unreadNotifications()->count(),
            'filter' => $request->filter ?? 'all',
        ]);
    }

    public function recent(Request $request): JsonResponse
    {
        $notifications = $request->user()
            ->notifications()
            ->limit(5)
            ->get()
            ->map(fn ($n) => [
                'id' => $n->id,
                'title' => $n->title,
                'message' => $n->message,
                'type' => $n->type,
                'url' => $n->url,
                'created_at' => $n->pivot->created_at->diffForHumans(),
                'is_read' => ! is_null($n->pivot->read_at),
            ]);

        return response()->json($notifications);
    }

    public function markAsRead(Request $request, string $id): RedirectResponse
    {
        $request->user()->notifications()->updateExistingPivot($id, ['read_at' => now()]);

        return back()->with('flash', ['status' => 'success', 'message' => 'Notificação marcada como lida.']);
    }

    public function markAllAsRead(Request $request): RedirectResponse
    {
        DB::table('notification_user')
            ->where('user_id', $request->user()->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return back()->with('flash', ['status' => 'success', 'message' => 'Todas as notificações foram marcadas como lidas.']);
    }

    public function destroy(Request $request, string $id): RedirectResponse
    {
        $request->user()->notifications()->updateExistingPivot($id, ['read_at' => now()]);

        return back()->with('flash', ['status' => 'success', 'message' => 'Notificação ocultada.']);
    }
}
