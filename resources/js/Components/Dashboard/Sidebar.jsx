import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { BrandLockup } from "@/Components/Brand";
import {
    Bell, Bookmark, ChevronDown, FileText, HelpCircle,
    Home, Lock, Monitor, Settings2, Tag, UserCog, Users, X,
} from "lucide-react";

function ChevronIcon({ open }) {
    return (
        <ChevronDown
            size={14}
            className={`ml-auto shrink-0 transition-transform duration-[120ms] ${open ? '' : '-rotate-90'}`}
        />
    );
}

const navLink = (isActive) =>
    'flex items-center gap-2.5 px-2.5 py-2 rounded text-sm no-underline transition-colors duration-[120ms] mb-0.5 ' +
    (isActive
        ? 'bg-green-50 text-green-700 font-semibold'
        : 'font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800');

const groupBtn = (isOpen) =>
    'flex items-center gap-2.5 px-2.5 py-2 w-full border-0 text-sm font-medium cursor-pointer rounded transition-colors duration-[120ms] ' +
    (isOpen
        ? 'bg-green-50 text-green-700'
        : 'bg-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800');

const sectionLabel = 'text-[10px] font-bold tracking-[.08em] uppercase text-neutral-500 px-2.5 pt-4 pb-1.5';

function Sidebar({ can, open, onClose }) {
    const { auth } = usePage().props;

    const [openAccess, setOpenAccess] = useState(
        route().current('users.*') ||
        route().current('permissions.*') ||
        route().current('rules.*') ||
        route().current('groups.*') ||
        route().current('activities.*') ||
        route().current('notifications.*')
    );

    const [openFaq, setOpenFaq] = useState(
        route().current('faqs.*') ||
        route().current('tags.*')
    );

    const hasAccess = true; // notificações visíveis para todos; demais itens por permissão
    const hasFaq = can.faqs_viewAny || can.tags_viewAny;

    const initials = auth?.user?.name
        ? auth.user.name.split(' ').map(x => x[0]).slice(0, 2).join('')
        : 'U';

    return (
        <aside className={
            'fixed md:relative inset-y-0 left-0 z-50 ' +
            'w-[280px] bg-white border-r border-neutral-200 flex flex-col shrink-0 h-full overflow-y-auto ' +
            'transition-transform duration-300 ' +
            (open ? 'translate-x-0' : '-translate-x-full md:translate-x-0')
        }>

            {/* Brand */}
            <div className="px-5 h-[68px] border-b border-neutral-200 flex items-center shrink-0">
                <BrandLockup style={{ height: 36, width: 'auto', maxWidth: '100%' }} />
                <button
                    type="button"
                    className="ml-auto md:hidden p-1 rounded border-0 bg-transparent text-neutral-500 cursor-pointer hover:text-neutral-800 hover:bg-neutral-100"
                    onClick={onClose}
                    aria-label="Fechar menu"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Nav */}
            <nav className="p-3 flex-1">
                <div className={sectionLabel}>Sistema</div>

                <Link href={route('admin')} className={navLink(route().current('admin'))}>
                    <Home size={16} />
                    Início
                </Link>

                {/* <Link href={route('my-notifications.index')} className={navLink(
                    route().current('my-notifications.index')
                )}>
                    <Bell size={14} />
                    Notificações
                </Link> */}

                {hasAccess && (
                    <>
                        <div className={sectionLabel}>Acesso</div>
                        <div className="rounded overflow-hidden mb-0.5">
                            <button type="button" className={groupBtn(openAccess)} onClick={() => setOpenAccess(v => !v)}>
                                <Lock size={16} />
                                Controle de Acesso
                                <ChevronIcon open={openAccess} />
                            </button>
                            {openAccess && (
                                <div className="py-1 pl-3 flex flex-col gap-0.5">
                                    {auth?.is_admin && (
                                        <Link href={route('notifications.index')} className={navLink(
                                            route().current('notifications.index') ||
                                            route().current('notifications.show') ||
                                            route().current('notifications.edit') ||
                                            route().current('notifications.update') ||
                                            route().current('notifications.resend')
                                        )}>
                                            <Settings2 size={14} />
                                            Notificações
                                        </Link>
                                    )}
                                    {can.users_viewAny && (
                                        <Link href={route('users.index', { term: '', page: 1 })} className={navLink(route().current('users.*'))}>
                                            <Users size={14} />
                                            Usuários
                                        </Link>
                                    )}
                                    {can.groups_viewAny && (
                                        <Link href={route('groups.index', { term: '', page: 1 })} className={navLink(route().current('groups.*'))}>
                                            <Monitor size={14} />
                                            Páginas
                                        </Link>
                                    )}
                                    {can.permissions_viewAny && (
                                        <Link href={route('permissions.index', { term: '', page: 1 })} className={navLink(route().current('permissions.*'))}>
                                            <UserCog size={14} />
                                            Permissões
                                        </Link>
                                    )}
                                    {can.rules_viewAny && (
                                        <Link href={route('rules.index', { term: '', page: 1 })} className={navLink(route().current('rules.*'))}>
                                            <Bookmark size={14} />
                                            Regras
                                        </Link>
                                    )}
                                    {can.activities_viewAny && (
                                        <Link href={route('activities.index', { term: '', page: 1 })} className={navLink(route().current('activities.*'))}>
                                            <FileText size={14} />
                                            Logs
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {hasFaq && (
                    <>
                        <div className={sectionLabel}>Conteúdo</div>
                        <div className="rounded overflow-hidden mb-0.5">
                            <button type="button" className={groupBtn(openFaq)} onClick={() => setOpenFaq(v => !v)}>
                                <HelpCircle size={16} />
                                FAQ
                                <ChevronIcon open={openFaq} />
                            </button>
                            {openFaq && (
                                <div className="py-1 pl-3 flex flex-col gap-0.5">
                                    {can.faqs_viewAny && (
                                        <Link href={route('faqs.index', { term: '', page: 1 })} className={navLink(route().current('faqs.*'))}>
                                            <FileText size={14} />
                                            Perguntas e Respostas
                                        </Link>
                                    )}
                                    {can.tags_viewAny && (
                                        <Link href={route('tags.index', { term: '', page: 1 })} className={navLink(route().current('tags.*'))}>
                                            <Tag size={14} />
                                            Tags
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </nav>

            {/* Rodapé do sidebar */}
            <div className="px-4 py-3 border-t border-neutral-200 flex items-center gap-2.5 shrink-0">
                <div className="inline-flex items-center justify-center rounded-full bg-green-500 text-white font-bold shrink-0 w-8 h-8 text-xs">
                    {initials}
                </div>
                <div className="min-w-0">
                    <div className="font-bold text-xs text-neutral-800 truncate">{auth?.user?.name}</div>
                    <div className="text-[11px] text-neutral-500 truncate">{auth?.user?.email}</div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
