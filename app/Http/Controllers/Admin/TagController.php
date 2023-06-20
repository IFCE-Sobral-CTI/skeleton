<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('tags.viewAny', Tag::class);

        return Inertia::render('Faqs/Tag/Index', array_merge(Tag::search($request), [
            'can' => [
                'create' => $request->user()->can('tags.create'),
                'view' => $request->user()->can('tags.view'),
            ],
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('tags.create', Tag::class);

        return Inertia::render('Faqs/Tag/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $this->authorize('tags.create', Tag::class);

        try {
            $tag = Tag::create($request->validated());
            return redirect()->route('tags.show', $tag)->with('flash', ['status' => 'success', 'message' => 'Registro criado com sucesso.']);
        } catch (Exception $e) {
            return redirect()->route('tags.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Tag $tag)
    {
        $this->authorize('tags.view', $tag);

        return Inertia::render('Faqs/Tag/Show', [
            'tag' => $tag,
            'can' => [
                'update' => $request->user()->can('tags.update'),
                'delete' => $request->user()->can('tags.delete'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        $this->authorize('tags.update', $tag);

        return Inertia::render('Faqs/Tag/Edit', [
            'tag' => $tag,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $this->authorize('tags.update', $tag);

        try {
            $tag->update($request->validated());
            return redirect()->route('tags.show', $tag)->with('flash', ['status' => 'success', 'message' => 'Registro atualizado com sucesso.']);
        } catch (Exception $e) {
            return redirect()->route('tags.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag): RedirectResponse
    {
        $this->authorize('tags.delete', $tag);

        try {
            $tag->delete();
            return redirect()->route('tags.index')->with('flash', ['status' => 'success', 'message' => 'Registro apagado com sucesso.']);
        } catch (Exception $e) {
            return redirect()->route('tags.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }
}
