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
        $superAdminRole = Role::create(['name' => 'SuperAdmin']);
        $clienteRole = Role::create(['name' => 'Cliente']);

        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@accom.com',
            'password' => bcrypt('admin'),
        ])->assignRole($superAdminRole);
        
        /*** Permisos  ***/
        Permission::create(['name' => 'editar-encuestas']);
        Permission::create(['name' => 'eliminar-encuestas']);
        Permission::create(['name' => 'ver-encuestas']);
        Permission::create(['name' => 'crear-encuestas']);

        $superAdminRole->syncPermissions([
            'editar-encuestas',
            'eliminar-encuestas',
            'ver-encuestas',
            'crear-encuestas',
        ]);

        $clienteRole->syncPermissions([
            'ver-encuestas',
            'crear-encuestas',
        ]);

        User::create([
            'name' => 'Cliente',
            'email' => 'cliente@accom.com',
            'password' => bcrypt('cliente'),
        ])->assignRole($clienteRole);

    }
}
