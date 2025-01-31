import { useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const { data, login } = useAuth();

  const _login = useCallback(async () => {
    await login({ email: "john@example.com", password: "password123" });
  }, [login]);

  useEffect(() => {
    _login();
  }, [_login]);

  return <h1 className="text-4xl font-bold">Hello {data?.user?.name}</h1>;
}

export default HomePage;
