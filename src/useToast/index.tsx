import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface Toast {
  id?: string;
  title?: string;
  message: string;
  type: "error" | "success" | "info";
}

const ToastContext = createContext<any | null>(null);

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts) => toasts.slice(1)),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const showToast = useCallback(
    ({ type, message, title }) => {
      const addId = type + message;
      const isToast = !!toasts.filter((t) => t.id === addId).length;

      if (!isToast) {
        setToasts((toasts) => [...toasts, { type, message, title, id: addId }]);
      }
    },
    [toasts]
  );

  const handleRemove = (id: string) => {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toasts.length ? (
        <div
          className="ugly-toast-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            position: "fixed",
            left: "50%",
            bottom: "50px",
            transform: "translateX(-50%)",
          }}
        >
          {toasts.map(({ id, title, message, type }) => (
            <div
              className={`ugly-toast-item ${type}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#dc5151",
                padding: "10px 20px",
                minWidth: "300px",
                borderRadius: 5,
                color: "#fff",
              }}
              key={id}
            >
              <div className="ugly-toast-text-box">
                {title && <p className="ugly-toast-title">{title}</p>}
                <p className="ugly-toast-message">{message}</p>
              </div>
              <button
                className="ugly-toast-close-button"
                onClick={() => handleRemove(id!)}
              >
                닫기
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </ToastContext.Provider>
  );
};

export function useToast() {
  return useContext(ToastContext);
}
