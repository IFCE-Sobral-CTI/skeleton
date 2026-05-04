import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Dashboard/DataTable";
import Badge from "@/Components/Dashboard/Badge";
import Pagination from "@/Components/Dashboard/Pagination";
import { Plus, Search } from "lucide-react";

const TYPE_LABEL = {
    success: { label: 'Sucesso',    color: 'green'  },
    warning: { label: 'Atenção',    color: 'yellow' },
    danger:  { label: 'Urgente',    color: 'red'    },
    info:    { label: 'Informação', color: 'blue'   },
};

export default function Manage({ notifications, search: initialSearch, type: initialType }) {
    const [search, setSearch] = useState(initialSearch ?? '');
    const [type,   setType]   = useState(initialType   ?? '');

    const visit = useCallback((extra = {}) => {
        router.visit(route('notifications.index'), {
            data: { search, type, ...extra },
            preserveState: true,
            replace: true,
        });
    }, [search, type]);

    useEffect(() => {
        const t = setTimeout(() => visit({ search, page: 1 }), 300);
        return () => clearTimeout(t);
    }, [search]);

    const handleType = useCallback((val) => {
        setType(val);
        router.visit(route('notifications.index'), {
            data: { search, type: val, page: 1 },
            preserveState: true,
            replace: true,
        });
    }, [search]);

    const columns = useMemo(() => [
        {
            key:      'title',
            label:    'Notificação',
            primary:  true,
        },
        {
            key:   'type',
            label: 'Tipo',
            badge: true,
            render: item => {
                const m = TYPE_LABEL[item.type] ?? TYPE_LABEL.info;
                return <Badge color={m.color}>{m.label}</Badge>;
            },
        },
        {
            key:   'recipients',
            label: 'Destinatários',
            render: item => {
                const unread = item.recipients - item.read_count;
                let label = `${item.recipients} destinatário${item.recipients !== 1 ? 's' : ''}`;
                if (unread > 0) {
                    label += ` · ${unread} não ${unread !== 1 ? 'lidas' : 'lida'}`;
                }
                return <span className="text-sm text-neutral-600">{label}</span>;
            },
        },
        {
            key:      'message',
            label:    'Mensagem',
            cardBody: true,
        },
    ], []);

    const getHref = useCallback(item => route('notifications.show', item.id), []);

    return (
        <>
            <Head title="Gerenciar Notificações" />
            <AuthenticatedLayout
                titleChildren="Gerenciar Notificações"
                breadcrumbs={[
                    { label: 'Notificações', url: route('my-notifications.index') },
                    { label: 'Gerenciar', url: route('notifications.index') },
                ]}
            >
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                            <Search size={16} />
                        </span>
                        <input
                            type="search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full h-10 pl-9 pr-3 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-200"
                            placeholder="Buscar por título ou mensagem…"
                        />
                    </div>

                    <select
                        value={type}
                        onChange={e => handleType(e.target.value)}
                        className="sm:w-36 h-10 px-3 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 cursor-pointer"
                    >
                        <option value="">Todos os tipos</option>
                        {Object.entries(TYPE_LABEL).map(([v, m]) => (
                            <option key={v} value={v}>{m.label}</option>
                        ))}
                    </select>

                    <Link
                        href={route('notifications.create')}
                        className="shrink-0 inline-flex items-center gap-2 h-10 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors no-underline"
                    >
                        <Plus size={16} />
                        <span className="hidden sm:inline">Nova notificação</span>
                    </Link>
                </div>

                <DataTable
                    layout="cards"
                    columns={columns}
                    rows={notifications.data}
                    href={getHref}
                    empty="Nenhuma notificação encontrada."
                />

                <Pagination data={notifications} count={notifications.total} />
            </AuthenticatedLayout>
        </>
    );
}
