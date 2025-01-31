<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="NewsHub API",
 *     version="1.0.0",
 *     description="The NewsHub API",
 * )
 * -----------------------------------------
 * Shared Schemas:
 * -----------------------------------------
 * @OA\Schema(
 *      schema="PaginationMeta",
 *      type="object",
 *      @OA\Property(property="path", type="string", example="http://example.com/api/resource"),
 *      @OA\Property(property="first_page_url", type="string", example="http://example.com/api/resource?page=2"),
 *      @OA\Property(property="prev_page_url", type="string", example="http://example.com/api/resource?page=1"),
 *      @OA\Property(property="next_page_url", type="string", example="http://example.com/api/resource?page=3"),
 *      @OA\Property(property="per_page", type="integer", example=15),
 *      @OA\Property(property="current_page", type="integer", example=2),
 *      @OA\Property(property="from", type="integer", example=16),
 *      @OA\Property(property="to", type="integer", example=30),
 *  )
 *
 * @OA\SecurityScheme(
 *      securityScheme="sanctum",
 *      type="http",
 *      scheme="bearer"
 *  )
 */
abstract class Controller
{
    //
}
