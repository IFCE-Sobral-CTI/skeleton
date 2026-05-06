<?php

namespace Tests\Feature\Auth;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use LdapRecord\Auth\Guard;
use LdapRecord\Connection;
use LdapRecord\Container as LdapContainer;
use Tests\TestCase;

class LdapAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Permission::factory()->create(['description' => 'Test']);

        LdapContainer::getNewInstance();
    }

    protected function tearDown(): void
    {
        LdapContainer::setInstance(null);

        parent::tearDown();
    }

    private function mockLdapBindResult(bool $success): void
    {
        $guard = $this->createMock(Guard::class);
        $guard->method('attempt')->willReturn($success);

        $connection = $this->createMock(Connection::class);
        $connection->method('auth')->willReturn($guard);

        LdapContainer::addConnection($connection, 'default');
    }

    public function test_ldap_bind_success_authenticates_user(): void
    {
        $this->mockLdapBindResult(true);

        $user = User::factory()->create(['registry' => '3024033']);

        $response = $this->post('/login', [
            'registry' => '3024033',
            'password' => 'ad-password',
        ]);

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('admin', absolute: false));
    }

    public function test_ldap_bind_failure_falls_back_to_local_password(): void
    {
        $this->mockLdapBindResult(false);

        $user = User::factory()->create(['registry' => '3024033']);

        $response = $this->post('/login', [
            'registry' => '3024033',
            'password' => 'password',
        ]);

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('admin', absolute: false));
    }

    public function test_both_ldap_and_local_fail_rejects_user(): void
    {
        $this->mockLdapBindResult(false);

        User::factory()->create(['registry' => '3024033']);

        $response = $this->post('/login', [
            'registry' => '3024033',
            'password' => 'wrong-local-password',
        ]);

        $response->assertSessionHasErrors('registry');
    }

    public function test_ldap_not_configured_falls_back_to_local_password(): void
    {
        $user = User::factory()->create(['registry' => '3024033']);

        $response = $this->post('/login', [
            'registry' => '3024033',
            'password' => 'password',
        ]);

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('admin', absolute: false));
    }

    public function test_ldap_updates_user_guid_on_successful_bind(): void
    {
        $this->mockLdapBindResult(true);

        $user = User::factory()->create([
            'registry' => '3024033',
            'guid' => null,
        ]);

        $this->post('/login', [
            'registry' => '3024033',
            'password' => 'ad-password',
        ]);

        $this->assertAuthenticated();
    }
}
