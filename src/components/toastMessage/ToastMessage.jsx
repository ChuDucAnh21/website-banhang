import { createContext, useContext, useState } from "react";

const ToastContext = createContext();   // tạo useContext

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts]  = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    // setToasts([...toasts, { id, message, type }]);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000); // 3s tự ẩn
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Hiển thị toast */}
      <div className="fixed top-1 min-w-[300px] pb-9 text-center right-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 h-[50px] md:h-[70px]  rounded flex items-center  text-white shadow ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
