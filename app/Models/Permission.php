<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @method static search(Request $request)
 *
 * @property int $id
 * @property string $description
 * @property Rule $rule
 * @property User $uses
 */
class Permission extends Model
{
    use HasFactory, LogsActivity;

    /**
     * @var array
     */
    protected $fillable = [
        'description',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:d/m/Y H:i:s',
        'updated_at' => 'datetime:d/m/Y H:i:s',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'description',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function rules(): BelongsToMany
    {
        return $this->belongsToMany(Rule::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->where('description', 'like', "%{$request->term}%");

        return [
            'count' => $query->count(),
            'permissions' => $query->orderBy('description', 'ASC')->paginate(env('APP_PAGINATION'))->appends(['term' => $request->term]),
            'page' => $request->page ?? 1,
            'termSearch' => $request->term,
        ];
    }
}
