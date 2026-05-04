<?php

namespace Database\Factories;

use App\Models\Faq;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Faq>
 */
class FaqFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question' => fake()->sentence(),
            'answer' => fake()->text(),
            'user_id' => User::all()->random()->id,
            'tag_id' => Tag::all()->random()->id,
        ];
    }
}
