<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index()
    {

    }

    public function faq(Request $request): Response
    {
        $query = Faq::select('id', 'question', 'answer')
            ->where('question', 'like', '%'.$request->term.'%')
            ->orWhere('answer', 'like', '%'.$request->term.'%')
            ->orderBy('question', 'ASC')
            ->get();

        return Inertia::render('Faq', [
            'faqs' => $query,
        ]);
    }
}
