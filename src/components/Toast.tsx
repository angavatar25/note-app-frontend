import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}


const Toast: React.FC<ToastProps> = ({ show, message, type, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <>
      {show && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all ${
            show ? 'toast-enter' : 'toast-exit opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`${
              type === 'success' 
                ? 'bg-green-500' 
                : 'bg-red-500'
            } text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px] max-w-[90vw] backdrop-blur-lg bg-opacity-95`}
          >
            {type === 'success' ? (
              <CheckCircle size={24} className="flex-shrink-0" />
            ) : (
              <XCircle size={24} className="flex-shrink-0" />
            )}
            <p className="font-medium text-sm">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;