<?php

namespace Tests\Feature\Auth;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use LdapRecord\Auth\Guard;
use LdapRecord\Connection;
use LdapRecord\Container as LdapContainer;
use Tests\TestCase;

class PasswordConfirmationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Permission::factory()->create(['description' => 'Test']);
    }

    public function test_confirm_password_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/confirm-password');

        $response->assertStatus(200);
    }

    public function test_password_can_be_confirmed_via_local_fallback(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/confirm-password', [
            'password' => 'password',
        ]);

        $response->assertRedirect();
        $response->assertSessionHasNoErrors();
    }

    public function test_password_is_not_confirmed_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/confirm-password', [
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors();
    }

    public function test_password_can_be_confirmed_via_ldap(): void
    {
        $guard = $this->createMock(Guard::class);
        $guard->method('attempt')->willReturn(true);

        $connection = $this->createMock(Connection::class);
        $connection->method('auth')->willReturn($guard);

        LdapContainer::getNewInstance();
        LdapContainer::addConnection($connection, 'default');

        $user = User::factory()->create(['registry' => '3024033']);

        $response = $this->actingAs($user)->post('/confirm-password', [
            'password' => 'ad-password',
        ]);

        $response->assertRedirect();
        $response->assertSessionHasNoErrors();

        LdapContainer::setInstance(null);
    }
}
