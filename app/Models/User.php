<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @method static search(Request $request)
 * @property int $id
 * @property string $name
 * @property string $email
 * @property int $status
 * @property Permission $permission
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, LogsActivity, CausesActivity;

    const ACTIVE = 1;
    const INACTIVE = 0;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'registry',
        'status',
        'email_verified_at',
        'permission_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * @return LogOptions
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'name',
                'email',
                'registry',
                'permission.name'
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    /**
     * @return BelongsTo
     */
    public function permission(): BelongsTo
    {
        return $this->belongsTo(Permission::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(Faq::class);
    }

    /**
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->permission->description === 'Administrador';
    }

    /**
     * @param $rule
     * @return bool
     */
    public function hasRule($rule): bool
    {
        return $this->permission->rules()->hasControl($rule);
    }

    /**
     * @param Builder $query
     * @param Request $request
     * @return array
     */
    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->with('permission')
            ->where('name', 'like', "%{$request->term}%")
            ->orWhere('email', 'like', "%{$request->term}%");

        return [
            'count' => $query->count(),
            'users' => $query->orderBy('name', 'ASC')->paginate(env('APP_PAGINATION'))->appends(['term' => $request->term]),
            'page' => $request->page?? 1,
            'termSearch' => $request->term,
        ];
    }
}
