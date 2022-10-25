<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;

/**
 * @method static search(mixed $term)
 * @property string description
 * @property string control
 * @property string group
 */
class Rule extends Model
{
    use HasFactory;

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
     * @param $query
     * @param $control
     * @return bool
     */
    public function scopeHasControl($query, $control): bool
    {
        return (bool) $query->where('control', $control)->count();
    }
}
