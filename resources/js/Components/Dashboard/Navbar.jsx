import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import {
    Bell, CheckCheck, ChevronDown, CircleUser, Info,
    LogOut, Menu, Search, TriangleAlert, X, CircleCheck,
} from "lucide-react";

const INPUT_CLASS =
    "w-full h-10 pl-9 pr-8 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-200";

const TYPE_META = {
    success: { icon: CircleCheck,   dot: 'bg-green-500',  bg: 'bg-green-50',  text: 'text-green-700' },
    warning: { icon: TriangleAlert, dot: 'bg-warn-500',   bg: 'bg-warn-50',   text: 'text-warn-700'  },
    danger:  { icon: TriangleAlert, dot: 'bg-red-500',    bg: 'bg-red-50',    text: 'text-red-700'   },
    info:    { icon: Info,          dot: 'bg-info-500',   bg: 'bg-info-50',   text: 'text-info-500'  },
};
function typeMeta(type) { return TYPE_META[type] ?? TYPE_META.info; }

/* ── Search ─────────────────────────────────────────────────────────── */
function SearchBox({ term, setTerm, results, searching, searchOpen, setSearchOpen, onResultClick, onKeyDown, inputRef }) {
    const grouped = results.reduce((acc, item) => {
        (acc[item.module] ??= []).push(item);
        return acc;
    }, {});

    return (
        <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none z-10">
                {searching
                    ? <span className="inline-block w-4 h-4 border-2 border-neutral-300 border-t-green-500 rounded-full animate-spin" />
                    : <Search size={16} />
                }
            </span>
            <input
                ref={inputRef}
                value={term}
                onChange={e => setTerm(e.target.value)}
                onFocus={() => results.length > 0 && setSearchOpen(true)}
                onKeyDown={onKeyDown}
                placeholder="Buscar…"
                autoComplete="off"
                type="search"
                className={INPUT_CLASS}
            />
            {term && (
                <button
                    type="button"
                    onClick={() => { setTerm(''); setSearchOpen(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 border-0 bg-transparent cursor-pointer p-0"
                >
                    <X size={14} />
                </button>
            )}

            {searchOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white border border-neutral-200 rounded-xl shadow-lg z-[300] overflow-hidden max-h-[400px] overflow-y-auto">
                    {Object.entries(grouped).map(([module, items]) => (
                        <div key={module}>
                            <div className="px-3 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                                {module}
                            </div>
                            {items.map((item, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => onResultClick(item.url)}
                                    className="w-full flex flex-col px-3 py-2 text-left hover:bg-neutral-50 transition-colors border-0 bg-transparent cursor-pointer"
                                >
                                    <span className="text-[13px] font-medium text-neutral-800 truncate">{item.label}</span>
                                    {item.sub && (
                                        <span className="text-[11px] text-neutral-400 truncate">{item.sub}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    ))}
                    {results.length === 0 && (
                        <p className="px-3 py-4 text-[13px] text-neutral-400 text-center">Nenhum resultado.</p>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Notifications dropdown ─────────────────────────────────────────── */
function NotifDropdown({ count, onClose }) {
    const [items, setItems]     = useState([]);
    const [loading, setLoading] = useState(true);
    const { post }              = useForm();

    useEffect(() => {
        fetch(route('my-notifications.recent'), { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
            .then(r => r.json())
            .then(setItems)
            .finally(() => setLoading(false));
    }, []);

    const markRead = useCallback((id) => {
        router.patch(route('my-notifications.read', id), {}, {
            preserveScroll: true,
            onSuccess: () => setItems(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n)),
        });
    }, []);

    const markAll = useCallback(() => {
        router.patch(route('my-notifications.read-all'), {}, {
            preserveScroll: true,
            onSuccess: () => setItems(prev => prev.map(n => ({ ...n, is_read: true }))),
        });
    }, []);

    const unread = items.filter(n => !n.is_read).length;

    return (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[340px] bg-white border border-neutral-200 rounded-xl shadow-[var(--shadow-lg)] z-[200] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                <span className="text-[13px] font-semibold text-neutral-800">Notificações</span>
                <div className="flex items-center gap-2">
                    {unread > 0 && (
                        <button
                            type="button"
                            onClick={markAll}
                            title="Marcar todas como lidas"
                            className="text-neutral-400 hover:text-green-600 bg-transparent border-0 cursor-pointer p-0 transition-colors"
                        >
                            <CheckCheck size={15} />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-neutral-400 hover:text-neutral-600 bg-transparent border-0 cursor-pointer p-0 transition-colors"
                    >
                        <X size={15} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="max-h-[320px] overflow-y-auto">
                {loading && (
                    <div className="flex justify-center py-8">
                        <span className="inline-block w-5 h-5 border-2 border-neutral-200 border-t-green-500 rounded-full animate-spin" />
                    </div>
                )}

                {!loading && items.length === 0 && (
                    <p className="text-[13px] text-neutral-400 text-center py-8">Nenhuma notificação.</p>
                )}

                {!loading && items.map(n => {
                    const meta = typeMeta(n.type);
                    return (
                        <div
                            key={n.id}
                            className={`flex items-start gap-3 px-4 py-3 border-b border-neutral-50 transition-colors ${n.is_read ? '' : 'bg-green-50/40'}`}
                        >
                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.is_read ? 'bg-neutral-200' : meta.dot}`} />
                            <div className="flex-1 min-w-0">
                                {n.url
                                    ? <a href={n.url} onClick={onClose} className={`text-[13px] font-semibold no-underline ${n.is_read ? 'text-neutral-600' : 'text-neutral-900'} block truncate`}>{n.title}</a>
                                    : <span className={`text-[13px] font-semibold ${n.is_read ? 'text-neutral-600' : 'text-neutral-900'} block truncate`}>{n.title}</span>
                                }
                                <p className="text-[11px] text-neutral-500 leading-snug line-clamp-2">{n.message}</p>
                                <span className="text-[10px] text-neutral-400">{n.created_at}</span>
                            </div>
                            {!n.is_read && (
                                <button
                                    type="button"
                                    onClick={() => markRead(n.id)}
                                    title="Marcar como lida"
                                    className="shrink-0 text-neutral-300 hover:text-green-500 bg-transparent border-0 cursor-pointer p-0 mt-0.5 transition-colors"
                                >
                                    <CheckCheck size={14} />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-neutral-100 text-center">
                <Link
                    href={route('my-notifications.index')}
                    onClick={onClose}
                    className="text-[12px] font-semibold text-green-600 no-underline hover:text-green-700"
                >
                    Ver todas as notificações
                </Link>
            </div>
        </div>
    );
}

/* ── Navbar ─────────────────────────────────────────────────────────── */
function Navbar({ onMenuToggle }) {
    const { auth, notifications_count } = usePage().props;
    const { post } = useForm();

    const [dropOpen,     setDropOpen]     = useState(false);
    const [notifOpen,    setNotifOpen]    = useState(false);
    const [mobileSearch, setMobileSearch] = useState(false);
    const [term,         setTerm]         = useState('');
    const [results,      setResults]      = useState([]);
    const [searching,    setSearching]    = useState(false);
    const [searchOpen,   setSearchOpen]   = useState(false);

    const dropRef        = useRef(null);
    const notifRef       = useRef(null);
    const desktopRef     = useRef(null);
    const mobileRef      = useRef(null);
    const mobileInputRef = useRef(null);

    useEffect(() => {
        function handle(e) {
            if (dropRef.current   && !dropRef.current.contains(e.target))   setDropOpen(false);
            if (notifRef.current  && !notifRef.current.contains(e.target))  setNotifOpen(false);
        }
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    useEffect(() => {
        function handle(e) {
            const insideDesktop = desktopRef.current?.contains(e.target);
            const insideMobile  = mobileRef.current?.contains(e.target);
            if (!insideDesktop && !insideMobile) setSearchOpen(false);
        }
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    useEffect(() => {
        if (term.length < 2) { setResults([]); setSearchOpen(false); return; }
        setSearching(true);
        const timer = setTimeout(() => {
            fetch(route('search') + '?term=' + encodeURIComponent(term), {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            })
                .then(r => r.json())
                .then(data => { setResults(data); setSearchOpen(data.length > 0); })
                .finally(() => setSearching(false));
        }, 300);
        return () => clearTimeout(timer);
    }, [term]);

    const openMobile  = useCallback(() => { setMobileSearch(true); setTimeout(() => mobileInputRef.current?.focus(), 50); }, []);
    const closeMobile = useCallback(() => { setMobileSearch(false); setTerm(''); setSearchOpen(false); }, []);
    const handleKeyDown     = useCallback(e => { if (e.key === 'Escape') { setSearchOpen(false); setTerm(''); setMobileSearch(false); } }, []);
    const handleResultClick = useCallback(url => { setSearchOpen(false); setTerm(''); setMobileSearch(false); router.visit(url); }, []);

    const initials  = auth?.user?.name ? auth.user.name.split(' ').map(x => x[0]).slice(0, 2).join('') : 'U';
    const firstName = auth?.user?.name?.split(' ')[0] ?? '';
    const unread    = notifications_count ?? 0;

    return (
        <div className="bg-white border-b border-neutral-200 shrink-0">

            {/* Main bar */}
            <div className="h-[68px] flex items-center px-4 md:px-6 gap-3 md:gap-4">

                <button
                    type="button"
                    className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full bg-transparent border-0 text-neutral-600 cursor-pointer transition-colors hover:bg-neutral-100"
                    onClick={onMenuToggle}
                    aria-label="Abrir menu"
                >
                    <Menu size={20} />
                </button>

                {/* Desktop search */}
                <div className="hidden md:flex flex-1 max-w-[380px]" ref={desktopRef}>
                    <SearchBox
                        term={term} setTerm={setTerm}
                        results={results} searching={searching}
                        searchOpen={searchOpen} setSearchOpen={setSearchOpen}
                        onResultClick={handleResultClick}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Right side */}
                <div className="ml-auto flex items-center gap-2.5">

                    {/* Mobile search toggle */}
                    <button
                        type="button"
                        className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full bg-transparent border-0 text-neutral-600 cursor-pointer transition-colors hover:bg-neutral-100"
                        onClick={mobileSearch ? closeMobile : openMobile}
                        aria-label="Buscar"
                    >
                        {mobileSearch ? <X size={18} /> : <Search size={18} />}
                    </button>

                    {/* Bell */}
                    <div className="relative" ref={notifRef}>
                        <button
                            type="button"
                            onClick={() => setNotifOpen(v => !v)}
                            className="relative w-9 h-9 inline-flex items-center justify-center rounded-full bg-transparent border-0 text-neutral-600 cursor-pointer transition-colors hover:bg-neutral-100"
                            title="Notificações"
                        >
                            <Bell size={18} />
                            {unread > 0 && (
                                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                                    {unread > 99 ? '99+' : unread}
                                </span>
                            )}
                        </button>

                        {notifOpen && (
                            <NotifDropdown
                                count={unread}
                                onClose={() => setNotifOpen(false)}
                            />
                        )}
                    </div>

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

            {/* Mobile search row */}
            {mobileSearch && (
                <div className="md:hidden px-4 pb-3" ref={mobileRef}>
                    <SearchBox
                        inputRef={mobileInputRef}
                        term={term} setTerm={setTerm}
                        results={results} searching={searching}
                        searchOpen={searchOpen} setSearchOpen={setSearchOpen}
                        onResultClick={handleResultClick}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            )}
        </div>
    );
}

export default Navbar;
