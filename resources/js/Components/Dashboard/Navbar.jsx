import React, { useEffect, useRef, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Bell, ChevronDown, CircleUser, LogOut, Menu, Search } from "lucide-react";

function Navbar({ onMenuToggle }) {
    const { auth } = usePage().props;
    const { post } = useForm();
    const [dropOpen, setDropOpen] = useState(false);
    const dropRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setDropOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const initials = auth?.user?.name
        ? auth.user.name.split(' ').map(x => x[0]).slice(0, 2).join('')
        : 'U';

    const firstName = auth?.user?.name?.split(' ')[0] ?? '';

    return (
        <div className="h-[68px] flex items-center px-4 md:px-6 bg-white border-b border-neutral-200 gap-3 md:gap-4 shrink-0">

            {/* Hamburger — mobile only */}
            <button
                type="button"
                className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full bg-transparent border-0 text-neutral-600 cursor-pointer transition-colors hover:bg-neutral-100 hover:text-neutral-800"
                onClick={onMenuToggle}
                aria-label="Abrir menu"
            >
                <Menu size={20} />
            </button>

            {/* Busca — hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-[380px] relative">
                <span className="absolute left-[11px] top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                    <Search size={16} />
                </span>
                <input
                    placeholder="Buscar…"
                    className="h-9 w-full pl-9 pr-3.5 border border-neutral-300 rounded-full bg-neutral-50 text-[13px] text-neutral-800 outline-none transition-[border-color,box-shadow] focus:border-green-500 focus:bg-white focus:shadow-[var(--shadow-focus)]"
                />
            </div>

            {/* Direita */}
            <div className="ml-auto flex items-center gap-2.5">

                {/* Notificações */}
                <button
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-transparent border-0 text-neutral-600 cursor-pointer transition-colors hover:bg-neutral-100 hover:text-neutral-800"
                    type="button"
                    title="Notificações"
                >
                    <Bell size={18} />
                </button>

                {/* Divisor */}
                <div className="w-px h-[22px] bg-neutral-200" />

                {/* User dropdown */}
                <div className="relative" ref={dropRef}>
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-transparent border-0 cursor-pointer py-1"
                        onClick={() => setDropOpen(v => !v)}
                    >
                        <div className="inline-flex items-center justify-center rounded-full bg-green-500 text-white font-bold shrink-0 w-8 h-8 text-xs">
                            {initials}
                        </div>
                        <span className="hidden sm:inline text-[13px] font-semibold text-neutral-800">{firstName}</span>
                        <ChevronDown size={12} className="text-neutral-500" />
                    </button>

                    {dropOpen && (
                        <div className="absolute right-0 top-[calc(100%+8px)] bg-white border border-neutral-200 rounded-lg shadow-[var(--shadow-md)] min-w-[160px] z-[200] overflow-hidden">
                            <Link
                                href={route('profile')}
                                className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-neutral-800 no-underline hover:bg-neutral-50"
                                onClick={() => setDropOpen(false)}
                            >
                                <CircleUser size={14} />
                                Perfil
                            </Link>
                            <div className="h-px bg-neutral-200" />
                            <button
                                type="button"
                                onClick={() => post(route('logout'))}
                                className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] text-red-600 bg-transparent border-0 cursor-pointer text-left hover:bg-red-50"
                            >
                                <LogOut size={14} />
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
