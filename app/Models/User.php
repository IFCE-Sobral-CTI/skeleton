<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use LdapRecord\Laravel\Auth\AuthenticatesWithLdap;
use LdapRecord\Laravel\Auth\LdapAuthenticatable;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * @method static search(Request $request)
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property int $status
 * @property Permission $permission
 */
class User extends Authenticatable implements LdapAuthenticatable
{
    use AuthenticatesWithLdap, CausesActivity, HasApiTokens, HasFactory, LogsActivity, Notifiable;

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
            'email_verified_at' => 'datetime:d/m/Y H:i:s',
            'created_at' => 'datetime:d/m/Y H:i:s',
            'updated_at' => 'datetime:d/m/Y H:i:s',
        ];
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'name',
                'email',
                'registry',
                'permission.name',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function permission(): BelongsTo
    {
        return $this->belongsTo(Permission::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(Faq::class);
    }

    public function notifications(): BelongsToMany
    {
        return $this->belongsToMany(Notification::class)
            ->withPivot('read_at')
            ->withTimestamps()
            ->orderByPivot('created_at', 'desc');
    }

    public function unreadNotifications(): BelongsToMany
    {
        return $this->notifications()->wherePivotNull('read_at');
    }

    public function isAdmin(): bool
    {
        return $this->permission?->description === 'Administrador';
    }

    public function hasRule($rule): bool
    {
        if (! $this->permission) {
            return false;
        }

        return $this->permission->rules()->hasControl($rule);
    }

    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->with('permission')
            ->where('name', 'like', "%{$request->term}%")
            ->orWhere('email', 'like', "%{$request->term}%");

        return [
            'count' => $query->count(),
            'users' => $query->orderBy('name', 'ASC')->paginate(env('APP_PAGINATION'))->appends(['term' => $request->term]),
            'page' => $request->page ?? 1,
            'termSearch' => $request->term,
        ];
    }
}
