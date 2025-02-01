import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for the toast message
type ToastMessage = {
  id: string; // Unique ID for each message
  message: string;
  type: "info" | "success" | "warning" | "error";
};

// Define the context type
type AppContextType = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  toastMessages: ToastMessage[];
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
};

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Context provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState<ToastMessage[]>([]);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const showToast = (message: string, type: ToastMessage["type"] = "info") => {
    const id = Date.now().toString(); // Generate a unique ID for the toast
    setToastMessages((prev) => [...prev, { id, message, type }]);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: string) => {
    setToastMessages((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        showLoading,
        hideLoading,
        toastMessages,
        showToast,
        removeToast,
      }}
    >
      {children}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="loading loading-spinner text-primary"></div>
        </div>
      )}
      <div className="toast toast-bottom toast-end">
        {toastMessages.map((toast) => (
          <div key={toast.id} className={`alert alert-${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};
