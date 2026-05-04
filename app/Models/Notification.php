<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @property int $id
 * @property string $title
 * @property string $message
 * @property string $type
 * @property string|null $url
 * @property int|null $created_by
 */
class Notification extends Model
{
    use LogsActivity;

    protected $fillable = [
        'title',
        'message',
        'type',
        'url',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:d/m/Y H:i:s',
            'updated_at' => 'datetime:d/m/Y H:i:s',
        ];
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['title', 'message', 'type'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('read_at')
            ->withTimestamps();
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->withCount('users')
            ->withCount(['users as read_count' => fn ($q) => $q->whereNotNull('notification_user.read_at')])
            ->when($request->term, fn ($q, $t) => $q->where(function ($q) use ($t) {
                $q->where('title', 'like', "%{$t}%")
                    ->orWhere('message', 'like', "%{$t}%");
            }))
            ->when($request->type, fn ($q, $t) => $q->where('type', $t));

        return [
            'count' => $query->count(),
            'notifications' => $query->latest()->paginate(env('APP_PAGINATION'))->appends([
                'term' => $request->term,
                'type' => $request->type,
            ]),
            'page' => $request->page ?? 1,
            'termSearch' => $request->term,
        ];
    }
}
