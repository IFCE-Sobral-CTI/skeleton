<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index()
    {

    }

    public function faq(Request $request, string $tag): Response
    {
        $tag = Tag::where('description', $tag)->firstOrFail();

        $query = Faq::select('id', 'question', 'answer')
            ->where('tag_id', $tag->id)
            ->where(function($query) use ($request) {
                return $query->where('question', 'like', '%'.$request->term.'%')
                    ->orWhere('answer', 'like', '%'.$request->term.'%');
            })
            ->orderBy('question', 'ASC')
            ->get();

        return Inertia::render('Faq', [
            'faqs' => $query,
        ]);
    }
}
