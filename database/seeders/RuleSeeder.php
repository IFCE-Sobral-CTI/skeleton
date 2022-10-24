<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Rule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * @var array $groups
         */
        $groups = [
            'groups' => ['group' => Group::firstOrCreate(['description' => 'Páginas'])],
            'rules' => ['group' => Group::firstOrCreate(['description' => 'Regras'])],
            'permissions' => [
                'group' => Group::firstOrCreate(['description' => 'Permissões']),
                'additional' => [
                    'Modificar regras' => 'permissions.rules',
                ]
            ],
            'users' => [
                'group' => Group::firstOrCreate(['description' => 'Usuários']),
                'additional' => [
                    'Perfil' => 'users.profile',
                    'Atualizar de senha' => 'users.update.password',
                ]
            ],
        ];

        foreach($groups as $key => $value) {
            Rule::insert($this->getInserts($key, $value['group'], $value['additional']??[]));
        }
    }

    /**
     * Generates an array of data to be inserted into the table
     *
     * @param string $page
     * @param Group $group
     * @param array $additional
     *
     * @return array
     */
    private function getInserts(string $page, Group $group, array $additional = []): array
    {
        $descriptions = array_merge($this->getDescriptionControl($page), $additional);

        $insert = [];

        foreach($descriptions as $key => $value) {
            $insert[] = [
                'description' => $key,
                'control' => $value,
                'group_id' => $group->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        return $insert;
    }

    /**
     * Generate an array with descriptions and their controls
     *
     * @param string $page
     * @return array
     */
    private function getDescriptionControl(string $page): array
    {
        return [
            'Página inicial' => $page.'.viewAny',
            'Detalhas' => $page.'.view',
            'Criar' => $page.'.create',
            'Atualizar' => $page.'.update',
            'Apagar' => $page.'.delete',
        ];
    }
}
