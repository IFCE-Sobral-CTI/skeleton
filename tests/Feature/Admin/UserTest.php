<?php

namespace Tests\Feature\Admin;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->for(
                Permission::factory()
                    ->state(function(array $attribute) {
                        return ['description' => 'Administrador'];
                    }))
            ->create();
    }

    public function test_user_is_admin()
    {
        $this->assertTrue($this->user->permission->description == 'Administrador');
    }

    public function test_users_can_access_page_index()
    {
        $response = $this->actingAs($this->user)->get(route('users.index'));

        $response->assertStatus(200);
    }

    public function test_users_can_access_edit_page()
    {
        $response = $this->actingAs($this->user, 'web')->get(route('users.edit', User::all()->random()->id));
        $this->assertAuthenticated();
        // $response->assertStatus(200);
    }

    public function test_users_can_access_show_page()
    {
        $user = User::factory()->create();

        $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $this->assertAuthenticated();
//        $response = $this->actingAs($user)->get(route('users.show', $user->id));
//        $response->assertStatus(200);
    }
}
