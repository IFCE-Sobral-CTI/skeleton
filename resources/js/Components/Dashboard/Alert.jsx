import AlertContext from "@/Context/AlertContext";
import React, { useContext, useEffect } from "react";
import { Info, X } from "lucide-react";

const toastBg = {
    success: 'bg-green-700',
    danger:  'bg-red-600',
    warning: 'bg-warn-700',
    info:    'bg-info-700',
    default: 'bg-neutral-800',
};

function Alert() {
    const { alert, setAlert, type, message } = useContext(AlertContext);

    useEffect(() => {
        if (!alert) return;
        const timer = setTimeout(() => setAlert(false), 6000);
        return () => clearTimeout(timer);
    }, [alert]);

    const bg = toastBg[type] ?? toastBg.default;

    return (
        <div className="fixed top-20 right-6 z-[900] pointer-events-none">
            <div className={`flex items-center gap-3 px-4 py-3.5 rounded-lg shadow-[var(--shadow-lg)] max-w-[380px] min-w-[260px] text-sm font-medium text-white pointer-events-auto ${bg} ${alert ? 'fadeIn' : 'fadeOut'}`}>
                <Info size={18} className="shrink-0" />
                <span className="flex-1">{message}</span>
                <button
                    type="button"
                    onClick={() => setAlert(false)}
                    className="ml-auto bg-transparent border-0 text-white/75 cursor-pointer flex items-center p-0 hover:text-white"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}

export default Alert;
