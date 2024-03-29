<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Coordenadoria de Tecnologia da Informação',
            'email' => 'ti.sobral@ifce.edu.br',
            'password' => Hash::make('qwe123'),
            'status' => 1,
            'registry' => 1000000,
            'permission_id' => Permission::where('description', 'Administrador')->first()->id
        ]);

        User::factory()->count(10)->create();
    }
}
