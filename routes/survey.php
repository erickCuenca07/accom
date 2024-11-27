<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SurveyController;

Route::middleware('auth')->group(function () {
    Route::post('/addSurvey', [SurveyController::class, 'create'])->name('survey.addSurvey');
    Route::put('/updateSurvey', [SurveyController::class, 'edit'])->name('survey.updateSurvey');
    Route::delete('/deleteSurvey/{id}', [SurveyController::class, 'delete'])->name('survey.deleteSurvey');
});

require __DIR__.'/auth.php';