<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::factory(3)->create()->each(function($tag) {
            $tag->faqs()->saveMany(
                Faq::factory(rand(25, 50))->make(['tag_id' => null])
            );
        });
    }
}
