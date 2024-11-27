<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $role = Role::create(['name' => 'Super Admin']);

        $permissions = [
            'listar-encuestas',
            'crear-encuestas',
            'editar-encuestas',
            'eliminar-encuestas'
        ];        
        foreach ($permissions as $permissionName) {
            Permission::create(['name' => $permissionName]);
        }

        $permissionsCollection = Permission::whereIn('name', $permissions)->get();
        $role->syncPermissions($permissionsCollection);

        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@accom.com',
            'password' => bcrypt('12345678'),
        ])->assignRole($role);
        
    }
}
