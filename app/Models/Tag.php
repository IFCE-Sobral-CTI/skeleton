<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Tag extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'description',
    ];

    protected $casts = [
        'created_at' => 'date:d/m/Y H:i:s',
        'updated_at' => 'date:d/m/Y H:i:s',
    ];

    /**
     * @return LogOptions
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'description',
            ])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(Faq::class);
    }

    public function scopeSearch(Builder $query, Request $request): array
    {
        $query->where('description', 'like', '%'.$request->term.'%');

        return [
            'count' => $query->count(),
            'data' => $query->orderBy('description', 'ASC')->paginate(env('APP_PAGINATION'))->appends(['term' => $request->term]),
            'page' => $request->page?? 1,
            'termSearch' => $request->term,
        ];
    }

    public function scopeGetTagsForSelect(Builder $query)
    {
        return $query->get()->map(function($item) {
            return [
                'id' => $item->id,
                'name' => $item->description
            ];
        });
    }
}
