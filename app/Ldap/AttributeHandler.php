<?php

namespace App\Ldap;

use App\Models\Permission;
use App\Models\User as DatabaseUser;
use Illuminate\Support\Facades\Cache;
use LdapRecord\Models\Model as LdapUser;

class AttributeHandler
{
    public function handle(LdapUser $ldap, DatabaseUser $database): void
    {
        $database->name = $ldap->getFirstAttribute('displayname')
            ?? $ldap->getFirstAttribute('cn');
        $database->email = $ldap->getFirstAttribute('mail');
        $database->status = DatabaseUser::ACTIVE;

        $upn = $ldap->getFirstAttribute('userprincipalname');

        if ($upn) {
            $database->registry = (int) explode('@', $upn)[0];
        }

        if (! $database->exists) {
            $database->permission_id = $this->defaultPermissionId();
            $database->email_verified_at = now();
        }
    }

    protected function defaultPermissionId(): ?int
    {
        return Cache::remember('default_ldap_permission_id', 86400, function () {
            return Permission::where('description', '!=', 'Administrador')
                ->orderBy('id')
                ->value('id');
        });
    }
}
