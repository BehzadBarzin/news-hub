import createClient, { Middleware } from "openapi-fetch";
import { paths } from "./types/api";
import Cookies from "js-cookie";

/**
 * Fetches the token from the auth cookie.
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

const apiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE,
  headers: {
    Accepts: "application/json",
  },
});

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    // set Auth header dynamically on every request
    // Read the auth token from cookie
    request.headers.set("Authorization", `Bearer ${getTokenFromCookie()}`);
    return request;
  },
};

apiClient.use(authMiddleware);

export const { GET, POST, PUT, PATCH, DELETE } = apiClient;
