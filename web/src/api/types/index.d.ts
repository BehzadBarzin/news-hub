/**
 * Export frequently used types from the generated file.
 */
import { components, paths } from "./api";

export type User = components["schemas"]["User"];
export type Article = components["schemas"]["Article"];
export type Author = components["schemas"]["Author"];
export type Category = components["schemas"]["Category"];
export type Source = components["schemas"]["Source"];
export type Feed = components["schemas"]["Feed"];

export type LoginRequest =
  paths["/api/login"]["post"]["requestBody"]["content"]["application/json"];
export type RegisterRequest =
  paths["/api/register"]["post"]["requestBody"]["content"]["application/json"];
export type AuthResponse =
  paths["/api/login"]["post"]["responses"]["200"]["content"]["application/json"];
