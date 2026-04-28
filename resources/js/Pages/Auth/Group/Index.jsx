import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Dashboard/DataTable";
import Pagination from "@/Components/Dashboard/Pagination";
import { Plus, Search } from "lucide-react";

function Index({ groups, count, page, termSearch, can }) {
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
        { key: 'description', label: 'Descrição', primary: true },
    ], []);

    const getHref = useCallback(
        item => can.view ? route('groups.show', item.id) : null,
        [can.view],
    );

    return (
        <AuthenticatedLayout
            titleChildren="Gerenciamento de Páginas"
            breadcrumbs={[{ label: 'Páginas', url: route('groups.index') }]}
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
                        placeholder="Buscar páginas…"
                    />
                </div>
                {can.create && (
                    <Link
                        href={route('groups.create')}
                        className="shrink-0 inline-flex items-center gap-2 h-10 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors no-underline"
                    >
                        <Plus size={16} />
                        <span className="hidden sm:inline">Nova página</span>
                    </Link>
                )}
            </div>

            <DataTable
                layout="cards"
                columns={columns}
                rows={groups.data}
                href={getHref}
                empty="Nenhuma página encontrada."
            />

            <Pagination data={groups} count={count} />
        </AuthenticatedLayout>
    );
}

export default Index;
