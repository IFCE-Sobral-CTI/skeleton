<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Permission;
use App\Models\Rule;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $term = trim($request->get('term', ''));

        if (strlen($term) < 2) {
            return response()->json([]);
        }

        $results = [];

        if ($request->user()->can('users.viewAny')) {
            $rows = User::where('name', 'like', "%{$term}%")
                ->orWhere('email', 'like', "%{$term}%")
                ->limit(4)
                ->get()
                ->map(fn ($u) => [
                    'module' => 'Usuários',
                    'label' => $u->name,
                    'sub' => $u->email,
                    'url' => route('users.show', $u->id),
                ])->toArray();

            $results = array_merge($results, $rows);
        }

        if ($request->user()->can('groups.viewAny')) {
            $rows = Group::where('description', 'like', "%{$term}%")
                ->limit(4)
                ->get()
                ->map(fn ($g) => [
                    'module' => 'Páginas',
                    'label' => $g->description,
                    'sub' => null,
                    'url' => route('groups.show', $g->id),
                ])->toArray();

            $results = array_merge($results, $rows);
        }

        if ($request->user()->can('permissions.viewAny')) {
            $rows = Permission::where('description', 'like', "%{$term}%")
                ->limit(4)
                ->get()
                ->map(fn ($p) => [
                    'module' => 'Permissões',
                    'label' => $p->description,
                    'sub' => null,
                    'url' => route('permissions.show', $p->id),
                ])->toArray();

            $results = array_merge($results, $rows);
        }

        if ($request->user()->can('rules.viewAny')) {
            $rows = Rule::where('description', 'like', "%{$term}%")
                ->orWhere('control', 'like', "%{$term}%")
                ->limit(4)
                ->get()
                ->map(fn ($r) => [
                    'module' => 'Regras',
                    'label' => $r->description,
                    'sub' => $r->control,
                    'url' => route('rules.show', $r->id),
                ])->toArray();

            $results = array_merge($results, $rows);
        }

        return response()->json($results);
    }
}
