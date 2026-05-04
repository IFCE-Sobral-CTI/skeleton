import React, { useCallback } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Dashboard/Pagination";
import {
    Bell, CheckCheck, CircleCheck, Info, Trash2, TriangleAlert,
} from "lucide-react";

const TYPE_META = {
    success: { icon: CircleCheck,   bg: 'bg-green-50',  border: 'border-green-200', icon_class: 'text-green-600' },
    warning: { icon: TriangleAlert, bg: 'bg-warn-50',   border: 'border-warn-200',  icon_class: 'text-warn-500'  },
    danger:  { icon: TriangleAlert, bg: 'bg-red-50',    border: 'border-red-200',   icon_class: 'text-red-500'   },
    info:    { icon: Info,          bg: 'bg-info-50',   border: 'border-info-200',  icon_class: 'text-info-500'  },
};
function typeMeta(type) { return TYPE_META[type] ?? TYPE_META.info; }

function NotificationItem({ notification, onRead, onDelete }) {
    const meta = typeMeta(notification.type);
    const Icon = meta.icon;
    const isRead = notification.pivot?.read_at != null;

    return (
        <div className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${isRead ? 'bg-white border-neutral-200' : `${meta.bg} ${meta.border}`}`}>
            <div className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isRead ? 'bg-neutral-100' : meta.bg}`}>
                <Icon size={18} className={isRead ? 'text-neutral-400' : meta.icon_class} />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                        {!isRead && <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-[5px]" />}
                        {notification.url
                            ? <a href={notification.url} className="text-[14px] font-semibold text-neutral-900 no-underline hover:text-green-700">{notification.title}</a>
                            : <span className={`text-[14px] font-semibold ${isRead ? 'text-neutral-600' : 'text-neutral-900'}`}>{notification.title}</span>
                        }
                    </div>
                    <span className="text-[11px] text-neutral-400 shrink-0 mt-0.5">{notification.created_at}</span>
                </div>
                {notification.message && (
                    <p className="text-[13px] text-neutral-600 mt-1 leading-relaxed">{notification.message}</p>
                )}
            </div>

            <div className="flex items-center gap-1 shrink-0 self-start mt-0.5">
                {!isRead && (
                    <button
                        type="button"
                        onClick={() => onRead(notification.id)}
                        title="Marcar como lida"
                        className="w-7 h-7 inline-flex items-center justify-center rounded-md text-neutral-400 hover:text-green-600 hover:bg-green-50 bg-transparent border-0 cursor-pointer transition-colors"
                    >
                        <CheckCheck size={15} />
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => onDelete(notification.id)}
                    title="Excluir"
                    className="w-7 h-7 inline-flex items-center justify-center rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 bg-transparent border-0 cursor-pointer transition-colors"
                >
                    <Trash2 size={15} />
                </button>
            </div>
        </div>
    );
}

export default function Index({ notifications, unread_count, filter }) {
    const handleRead = useCallback((id) => {
        router.patch(route('my-notifications.read', id), {}, { preserveScroll: true });
    }, []);

    const handleDelete = useCallback((id) => {
        if (window.confirm('Deseja ocultar esta notificação?')) {
            router.delete(route('my-notifications.destroy', id), { preserveScroll: true });
        }
    }, []);

    const handleMarkAll = useCallback(() => {
        router.patch(route('my-notifications.read-all'), {}, { preserveScroll: true });
    }, []);

    const setFilter = useCallback((f) => {
        router.visit(route('my-notifications.index'), { data: { filter: f }, preserveState: true, replace: true });
    }, []);

    return (
        <>
            <Head title="Notificações" />
            <AuthenticatedLayout
                titleChildren="Notificações"
                breadcrumbs={[{ label: 'Notificações', url: route('my-notifications.index') }]}
            >
                {/* Toolbar */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Filter tabs */}
                    <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
                        {[
                            { value: 'all',    label: 'Todas' },
                            { value: 'unread', label: `Não lidas${unread_count > 0 ? ` (${unread_count})` : ''}` },
                        ].map(({ value, label }) => (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setFilter(value)}
                                className={[
                                    'px-3 py-1.5 text-[13px] font-semibold rounded-md border-0 cursor-pointer transition-colors',
                                    filter === value
                                        ? 'bg-white text-neutral-900 shadow-[var(--shadow-xs)]'
                                        : 'bg-transparent text-neutral-500 hover:text-neutral-700',
                                ].join(' ')}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {unread_count > 0 && (
                            <button
                                type="button"
                                onClick={handleMarkAll}
                                className="inline-flex items-center gap-2 h-9 px-4 bg-white border border-neutral-300 text-neutral-700 text-[13px] font-semibold rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                            >
                                <CheckCheck size={15} />
                                <span className="hidden sm:inline">Marcar todas como lidas</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* List */}
                {notifications.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                        <Bell size={40} className="mb-3 opacity-30" />
                        <p className="text-[14px]">
                            {filter === 'unread' ? 'Nenhuma notificação não lida.' : 'Nenhuma notificação.'}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {notifications.data.map(n => (
                            <NotificationItem
                                key={n.id}
                                notification={n}
                                onRead={handleRead}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                <Pagination data={notifications} count={notifications.total} />
            </AuthenticatedLayout>
        </>
    );
}
