import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Bell, ChevronDown, CircleUser, LogOut, Menu, Search, X } from "lucide-react";

const INPUT_CLASS =
    "w-full h-10 pl-9 pr-8 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-200";

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

function Navbar({ onMenuToggle }) {
    const { auth } = usePage().props;
    const { post } = useForm();

    const [dropOpen, setDropOpen]           = useState(false);
    const [mobileSearch, setMobileSearch]   = useState(false);
    const [term, setTerm]                   = useState('');
    const [results, setResults]             = useState([]);
    const [searching, setSearching]         = useState(false);
    const [searchOpen, setSearchOpen]       = useState(false);

    const dropRef        = useRef(null);
    const desktopRef     = useRef(null);
    const mobileRef      = useRef(null);
    const mobileInputRef = useRef(null);

    // Close user dropdown on outside click
    useEffect(() => {
        function handle(e) {
            if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
        }
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    // Close search dropdown on outside click
    useEffect(() => {
        function handle(e) {
            const insideDesktop = desktopRef.current?.contains(e.target);
            const insideMobile  = mobileRef.current?.contains(e.target);
            if (!insideDesktop && !insideMobile) setSearchOpen(false);
        }
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    // Debounced fetch
    useEffect(() => {
        if (term.length < 2) {
            setResults([]);
            setSearchOpen(false);
            return;
        }
        setSearching(true);
        const timer = setTimeout(() => {
            fetch(route('search') + '?term=' + encodeURIComponent(term), {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            })
                .then(r => r.json())
                .then(data => {
                    setResults(data);
                    setSearchOpen(data.length > 0);
                })
                .finally(() => setSearching(false));
        }, 300);
        return () => clearTimeout(timer);
    }, [term]);

    // Open mobile search and focus input
    const openMobile = useCallback(() => {
        setMobileSearch(true);
        setTimeout(() => mobileInputRef.current?.focus(), 50);
    }, []);

    const closeMobile = useCallback(() => {
        setMobileSearch(false);
        setTerm('');
        setSearchOpen(false);
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') { setSearchOpen(false); setTerm(''); setMobileSearch(false); }
    }, []);

    const handleResultClick = useCallback((url) => {
        setSearchOpen(false);
        setTerm('');
        setMobileSearch(false);
        router.visit(url);
    }, []);

    const initials  = auth?.user?.name
        ? auth.user.name.split(' ').map(x => x[0]).slice(0, 2).join('')
        : 'U';
    const firstName = auth?.user?.name?.split(' ')[0] ?? '';

    return (
        <div className="bg-white border-b border-neutral-200 shrink-0">

            {/* Main bar */}
            <div className="h-[68px] flex items-center px-4 md:px-6 gap-3 md:gap-4">

                {/* Hamburger — mobile only */}
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

                    {/* Mobile: search toggle */}
                    <button
                        type="button"
                        className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full bg-transparent border-0 text-neutral-600 cursor-pointer transition-colors hover:bg-neutral-100"
                        onClick={mobileSearch ? closeMobile : openMobile}
                        aria-label="Buscar"
                    >
                        {mobileSearch ? <X size={18} /> : <Search size={18} />}
                    </button>

                    {/* Notificações */}
                    <button
                        type="button"
                        className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-transparent border-0 text-neutral-600 cursor-pointer transition-colors hover:bg-neutral-100"
                        title="Notificações"
                    >
                        <Bell size={18} />
                    </button>

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
