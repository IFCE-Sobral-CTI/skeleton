import React, { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Dashboard/DataTable";
import Pagination from "@/Components/Dashboard/Pagination";
import Description from "./Components/Description";
import { Search } from "lucide-react";

function Index({ activities, count, page, termSearch, can }) {
    const [term, setTerm] = useState(termSearch ?? '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.visit(route(route().current()), {
                data: { term, page: 1 },
                preserveState: true,
                replace: true,
            });
        }, 300);
        return () => clearTimeout(timer);
    }, [term]);

    const columns = useMemo(() => [
        {
            key: 'description',
            label: 'Ação',
            primary: true,
            render: item => <Description title={item.description} />,
        },
        {
            key: 'causer',
            label: 'Usuário',
            sub: true,
            render: item => item.causer?.name ?? '—',
        },
        {
            key: 'subject_type',
            label: 'Módulo',
            sub: true,
            render: item => item.subject_type.split('\\').pop(),
        },
        {
            key: 'created_at',
            label: 'Data',
            cardBody: true,
        },
    ], []);

    const getHref = useCallback(
        item => can.view ? route('activities.show', item.id) : null,
        [can.view],
    );

    return (
        <AuthenticatedLayout
            titleChildren="Gerenciamento de Logs"
            breadcrumbs={[{ label: 'Logs', url: route('activities.index') }]}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                        <Search size={16} />
                    </span>
                    <input
                        type="search"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-200"
                        placeholder="Buscar logs…"
                    />
                </div>
            </div>

            <DataTable
                layout="cards"
                columns={columns}
                rows={activities.data}
                href={getHref}
                empty="Nenhum log encontrado."
            />

            <Pagination data={activities} count={count} />
        </AuthenticatedLayout>
    );
}

export default Index;
