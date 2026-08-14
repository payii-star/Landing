<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware ini BUKAN buat user biasa. Ini gerbang khusus buat komunikasi
 * server-ke-server dari backend E-pkl (bukan dari browser).
 *
 * E-pkl mengirim header X-Internal-Api-Key yang isinya harus sama persis
 * dengan INTERNAL_API_KEY di .env Landing. Kalau tidak cocok / tidak ada,
 * request langsung ditolak sebelum masuk ke controller manapun.
 */
class VerifyInternalApiKey
{
    public function handle(Request $request, Closure $next): Response
    {
        $sentKey = $request->header('X-Internal-Api-Key');
        $validKey = config('services.internal_api.key');

        if (!$validKey || !$sentKey || !hash_equals($validKey, $sentKey)) {
            return response()->json([
                'message' => 'Unauthorized: invalid internal API key',
            ], 401);
        }

        return $next($request);
    }
}