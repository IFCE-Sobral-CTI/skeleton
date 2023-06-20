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
            'activities' => [
                'group' => Group::firstOrCreate(['description' => 'Logs']),
                'only' => ['Página inicial' => 'viewAny', 'Detalhes' => 'view'],
            ],
            'groups' => ['group' => Group::firstOrCreate(['description' => 'Páginas'])],
            'faqs' => ['group' => Group::firstOrCreate(['description' => 'FAQ'])],
            'tags' => ['group' => Group::firstOrCreate(['description' => 'Tags'])],
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
            Rule::insert($this->getInserts(page: $key, group: $value['group'], additional: $value['additional']??[], only: $value['only']?? []));
        }
    }

    /**
     * Generates an array of data to be inserted into the table
     *
     * @param string $page
     * @param Group $group
     * @param array $additional
     * @param array $only
     * @return array
     */
    private function getInserts(string $page, Group $group, array $additional = [], array $only = []): array
    {
        $descriptions = array_merge($this->getDescriptionControl($page, $only), $additional);

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
     * @param array $only
     * @return array
     */
    private function getDescriptionControl(string $page, array $only = []): array
    {
        if (!empty($only)) {
            $items = [];

            foreach ($only as $k => $v) {
                $items[$k] = sprintf('%s.%s', $page, $v);
            }

            return $items;
        }

        return [
            'Página inicial' => $page.'.viewAny',
            'Detalhes' => $page.'.view',
            'Criar' => $page.'.create',
            'Atualizar' => $page.'.update',
            'Apagar' => $page.'.delete',
        ];
    }
}
