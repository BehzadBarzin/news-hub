import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ReactQueryProvider } from "./providers/ReactQueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </AuthProvider>
  </StrictMode>
);
