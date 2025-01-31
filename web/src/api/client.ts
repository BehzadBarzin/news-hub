import createClient from "openapi-fetch";
import { paths } from "../types/api";
import Cookies from "js-cookie";

/**
 * Fetches the token from the auth cookie dynamically on each API call.
 * Ensures the latest token is used if the auth state changes (e.g., after login/logout).
 * Returns the token if valid, or `null` if the cookie is missing, invalid, or parsing fails.
 */
const getTokenFromCookie = () => {
  try {
    const cookieData = Cookies.get("auth-cookie");
    if (cookieData) {
      const parsedCookie = JSON.parse(cookieData) as { token: string };
      return parsedCookie.token;
    }
  } catch (error) {
    console.error("Failed to parse auth cookie:", error);
  }
  return null;
};

const { GET, POST, PUT, DELETE } = createClient<paths>({
  baseUrl: "http://localhost:8000",
  headers: {
    Accepts: "application/json",
    Authorization: `Bearer ${getTokenFromCookie()}`,
  },
});

export { GET, POST, PUT, DELETE };
