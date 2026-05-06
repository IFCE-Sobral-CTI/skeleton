<?php

namespace Tests\Feature\Auth;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Permission::factory()->create(['description' => 'Test']);
    }

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_via_local_password(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'registry' => $user->registry,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('admin', absolute: false));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'registry' => $user->registry,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_cannot_authenticate_if_not_registered_locally(): void
    {
        $this->post('/login', [
            'registry' => '9999999',
            'password' => 'any-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }

    public function test_login_page_has_esqueceu_a_senha_link_to_suap(): void
    {
        $response = $this->get('/login');

        $response->assertSee('suap.ifce.edu.br');
    }

    public function test_login_form_requires_registry(): void
    {
        $response = $this->post('/login', [
            'password' => 'password',
        ]);

        $response->assertSessionHasErrors('registry');
    }
}
