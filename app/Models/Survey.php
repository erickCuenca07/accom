<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Survey extends Model
{
    use HasFactory;

    protected $table = 'surveys';
    
    protected $fillable = [
        'dniClient',
        'product',
        'subproduct',
        'subProductGas',
        'maintenance',
        'maintenanceGas',
        'state',
    ];


}
