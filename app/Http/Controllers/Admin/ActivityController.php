<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     * @throws AuthorizationException
     */
    public function index(Request $request): Response
    {
        $this->authorize('activities.showAny', Activity::class);

        $activities = Activity::with(['causer', 'subject'])->orderBy('created_at', 'DESC')->paginate(env('APP_PAGINATION'))->appends(['term' => $request->term?? '']);

        $data = $activities->map(function($item) {
            $subject = explode('\\', $item->subject_type);
            return [
                'id' => $item->id,
                'description' => $item->description,
                'causer' => explode(' ', $item->causer?->name?? '-')[0],
                'subject' => end($subject),
                'created_at' => $item->created_at->format('d/m/Y H:i:s')
            ];
        });
        dd($data);
        return Inertia::render('Activity/Index', [
            'activities' => $data,
            'pagination' => $activities,
            'count' => Activity::count(),
            'page' => $request->page,
            'termSearch' => $request->term,
            'can' => [
                'view' => Auth::user()->can('activities.view'),
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Activity $activity
     * @return Response
     * @throws AuthorizationException
     */
    public function show(Activity $activity): Response
    {
        $this->authorize('activities.view', $activity);

        return Inertia::render('Activity/Show', [
            'activity' => $activity,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
