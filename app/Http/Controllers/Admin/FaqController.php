<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFaqRequest;
use App\Http\Requests\UpdateFaqRequest;
use App\Models\Faq;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('faqs.viewAny', Faq::class);

        return Inertia::render('Faq/Index', array_merge(Faq::search($request), [
            'can' => [
                'create' => Auth::user()->can('faqs.create'),
                'view' => Auth::user()->can('faqs.view'),
            ],
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('faqs.create', Faq::class);

        return Inertia::render('Faq/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFaqRequest $request)
    {
        $this->authorize('faqs.create', Faq::class);

        try {
            $faq = Auth::user()->faqs()->create($request->validated());
            return redirect()->route('faqs.show', $faq)->with('flash', ['status' => 'success', 'message' => 'Registro criado com sucesso.']);
        } catch (Exception $e) {
            return redirect()->route('faqs.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Faq $faq)
    {
        $this->authorize('faqs.view', $faq);

        return Inertia::render('Faq/Show', [
            'faq' => $faq,
            'can' => [
                'update' => Auth::user()->can('faqs.update'),
                'delete' => Auth::user()->can('faqs.delete'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq)
    {
        $this->authorize('faqs.update', $faq);

        return Inertia::render('Faq/Edit', [
            'faq' => $faq
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFaqRequest $request, Faq $faq)
    {
        $this->authorize('faqs.update', $faq);

        try {
            $faq->update($request->validated());
            return redirect()->route('faqs.show', $faq)->with('flash', ['status' => 'success', 'message' => 'Registro atualizado com sucesso.']);
        } catch (Exception $e) {
            return redirect()->route('faqs.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq): RedirectResponse
    {
        $this->authorize('faqs.delete', $faq);

        try {
            $faq->delete();
            return redirect()->route('faqs.index')->with('flash', ['status' => 'success', 'message' => 'Registro apagado com sucesso.']);
        } catch (Exception $e) {
            return redirect()->route('faqs.index')->with('flash', ['status' => 'danger', 'message' => $e->getMessage()]);
        }
    }
}
