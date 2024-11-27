<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Survey;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SurveyController extends Controller
{
    public function index(Request $request): Response
    {
        $surveys = Survey::all();
        $permissions = $request->user()->getAllPermissions()->pluck('name');
        return Inertia::render('Dashboard', [
            'surveys' => $surveys,
            'permissions' => $permissions
        ]);
    }
    public function create (Request $request)
    {
        $survey = Survey::create([
            'dniClient' => $request->dni,
            'product' => $request->producto,
            'subproduct' => $request->subproducto,
            'subProductGas' => $request->subproductoGas ?? null,
            'maintenance' => $request->mantenimiento ?? null,
            'maintenanceGas' => $request->mantenimientoGas ?? null,
            'state' => $request->estado
        ]);
        try{
            if ($survey) {
                $findSurvey = Survey::find($survey->id);
                return new JsonResponse([
                    'message' => 'Encuesta guardada correctamente.',
                    'survey' => $findSurvey
                ]);
            }
        }catch(\Exception $e){
            return new JsonResponse([
                'message' => 'Ocurrió un error al guardar la encuesta.',
                'error' => $e->getMessage()
            ], 500);
        }      
    }

    public function edit (Request $request)
    {
        $survey = Survey::find($request->id);
        if (!$survey) {
            return new JsonResponse(['exists' => 'true','message' => 'Encuesta no encontrada'], 404);
        }
        try{
            $survey->update([
                'dniClient' => $request->dni,
                'product' => $request->producto,
                'subproduct' => $request->subproducto,
                'subProductGas' => $request->subproductoGas ?? null,
                'maintenance' => $request->mantenimiento ?? null,
                'maintenanceGas' => $request->mantenimientoGas ?? null,
                'state' => $request->estado
            ]);
            $findSurveyUpdated = Survey::find($survey->id);
            return new JsonResponse([
                'message' => 'Encuesta editada correctamente.',
                'survey' => $findSurveyUpdated
            ]);
        }catch(\Exception $e){
            return new JsonResponse([
                'message' => 'Ocurrió un error al editar la encuesta.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function delete (int $id)
    {
        $survey = Survey::find($id);
        if (!$survey) {
            return new JsonResponse(['exists' => 'true','message' => 'Encuesta no encontrada'], 404);
        }
        try{
            $survey->delete();
            return new JsonResponse([
                'message' => 'Encuesta eliminada correctamente.'
            ]);
        }catch(\Exception $e){
            return new JsonResponse([
                'message' => 'Ocurrió un error al eliminar la encuesta.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}