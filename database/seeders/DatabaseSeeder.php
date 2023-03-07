<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Permission;
use App\Models\User;
use Database\Factories\FaqFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RuleSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
        ]);

        // User::factory(23)->create();

        User::factory()->create([
            'name' => 'Coordenadoria de Tecnologia da Informação',
            'email' => 'ti.sobral@ifce.edu.br',
            'password' => Hash::make('qwe123'),
            'status' => 1,
            'registry' => 1000000,
            'permission_id' => Permission::where('description', 'Administrador')->first()->id
        ]);

        $this->call([
            FaqSeeder::class,
        ]);
    }
}
