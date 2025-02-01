import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ReactQueryProvider } from "./providers/ReactQueryProvider.tsx";
import { AppProvider } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <ReactQueryProvider>
          <App />
        </ReactQueryProvider>
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
