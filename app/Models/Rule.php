<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @method static search(mixed $term)
 * @method static hasControl()
 *
 * @property string description
 * @property string control
 * @property string group
 * @property Permission $permissions
 */
class Rule extends Model
{
    use HasFactory, LogsActivity;

    /**
     * @var array $fillable
     */
    protected $fillable = [
        'description',
        'control',
        'group_id',
    ];

    /**
     * @var array $casts
     */
    protected $casts = [
        'created_at' => 'datetime:d/m/Y H:i:s',
        'updated_at' => 'datetime:d/m/Y H:i:s',
    ];

    /**
     * @return LogOptions
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'description',
                'control',
                'group.description'
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    /**
     * @return BelongsToMany
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }

    /**
     * @return BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * @param Builder $query
     * @param Request $request
     *
     * @return array
     */
    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->with('group')
            ->whereHas('group', function(Builder $query) use ($request) {
                $query->where('description', 'like', "%{$request->term}%");
            })
            ->orWhere('description', 'like', "%{$request->term}%")
            ->orWhere('control', 'like', "%{$request->term}%");

        return [
            'count' => $query->count(),
            'rules' => $query->orderBy('control', 'ASC')->paginate(env('APP_PAGINATION'))->appends(['term' => $request->term]),
            'page' => $request->page?? 1,
            'termSearch' => $request->term,
        ];
    }

    /**
     * @param Builder $query
     * @param string $control
     *
     * @return bool
     */
    public function scopeHasControl(Builder $query, string $control): bool
    {
        return (bool) $query->where('control', $control)->count();
    }
}
