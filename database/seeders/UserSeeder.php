<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::create(['name' => 'cliente']);

        $permissions = [
            'listar-encuestas',
            'crear-encuestas',
        ]; 

        $permissionsCollection = Permission::whereIn('name', $permissions)->get();
        $role->syncPermissions($permissionsCollection);

        User::create([
            'name' => 'Cliente',
            'email' => 'cliente@accom.com',
            'password' => bcrypt('12345678'),
        ])->assignRole($role);
    }
}
