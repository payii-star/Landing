<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\Api\LandingController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\FooterController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\StatisticController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/


Route::get('landing-content', [LandingController::class, 'index']);
Route::get('front/content', [LandingController::class, 'frontContent']);
Route::get('front/navbar', [MenuController::class, 'index']);
Route::get('footer/landing', [FooterController::class, 'index']);

Route::get('front/projects', [ProjectController::class, 'index']);
Route::get('front/best-projects', [ProjectController::class, 'featured']);
Route::get('front/testimonials', [TestimonialController::class, 'index']);
Route::get('front/landing-cta', [LandingController::class, 'landingCta']);
Route::get('front/landing-about', [LandingController::class, 'landingAbout']);

Route::get('front/services', [ServiceController::class, 'index']);
Route::get('front/statistics', [StatisticController::class, 'index']);
Route::get('projects-page', [LandingController::class, 'projectsPage']);
Route::post('front/navbar/track-click/{menuId}', [MenuController::class, 'trackClick']);

Route::prefix('contact')->group(function () {
    Route::get('setting', [ContactController::class, 'setting']);
    Route::post('messages', [ContactController::class, 'store']);
});

Route::prefix('setting')->group(function () {
    Route::get('', [SettingController::class, 'index']);
});


Route::middleware(['auth', 'json'])->prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->withoutMiddleware('auth');
    Route::delete('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
});



Route::middleware(['auth', 'verified', 'json'])->group(function () {

    Route::prefix('setting')->middleware('can:setting')->group(function () {
        Route::post('', [SettingController::class, 'update']);
    });

    Route::prefix('master')->group(function () {
        Route::middleware('can:master-user')->group(function () {
            Route::get('users', [UserController::class, 'get']);
            Route::post('users', [UserController::class, 'index']);
            Route::post('users/store', [UserController::class, 'store']);
            Route::apiResource('users', UserController::class)
                ->except(['index', 'store'])->scoped(['user' => 'uuid']);
        });

        Route::middleware('can:master-role')->group(function () {
            Route::get('roles', [RoleController::class, 'get'])->withoutMiddleware('can:master-role');
            Route::post('roles', [RoleController::class, 'index']);
            Route::post('roles/store', [RoleController::class, 'store']);
            Route::apiResource('roles', RoleController::class)
                ->except(['index', 'store']);
        });
    });
});
