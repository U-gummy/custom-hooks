import { useCallback, useState } from "react";

export interface Toast {
  id?: string;
  title?: string;
  message: string;
  type: "error" | "success";
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback(
    (toastId: string) => {
      setToasts((currentToast) =>
        currentToast.filter((toast) => toast.id !== toastId)
      );
    },
    [setToasts]
  );

  const showToast = useCallback(
    (toast: Toast) => {
      const id = toast.message;
      setToasts((currentToast) => {
        const isExist = currentToast.find((item) => item.message === id);
        return isExist ? currentToast : [...currentToast, { ...toast, id }];
      });
      setTimeout(() => hideToast(id), 3000);
    },
    [hideToast, setToasts]
  );

  return { toasts, showToast, hideToast };
};