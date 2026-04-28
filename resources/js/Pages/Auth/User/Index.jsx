import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Dashboard/DataTable";
import Badge from "@/Components/Dashboard/Badge";
import Pagination from "@/Components/Dashboard/Pagination";
import { Plus, Search } from "lucide-react";

// Paleta excluindo verde e vermelho (reservados para status).
// O módulo pelo id garante cor consistente para cada permissão.
const PERMISSION_COLORS = ['blue', 'violet', 'orange', 'yellow', 'gray'];
function permissionColor(id) {
    return PERMISSION_COLORS[id % PERMISSION_COLORS.length];
}

function Index({ users, count, page, termSearch, can }) {
    const [term, setTerm] = useState(termSearch ?? '');

    // Navega para página 1 sempre que o termo muda; passa page:1 diretamente
    // para evitar capturar valor stale de um estado intermediário.
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

    // Definição estável — não depende de estado nem de props mutáveis.
    const columns = useMemo(() => [
        {
            key: 'name',
            label: 'Usuário',
            primary: true,
            mobileSub: item => `Matrícula ${item.registry}`,
        },
        {
            key: 'permission',
            label: 'Permissão',
            badge: true,
            render: item => <Badge className={'sm:px-2 sm:py-1'} color={permissionColor(item.permission.id)}>{item.permission.description}</Badge>,
        },
        {
            key: 'status',
            label: 'Situação',
            badge: true,
            render: item => item.status == '1'
                ? <Badge className={'sm:px-2 sm:py-1'} color="green">Ativo</Badge>
                : <Badge className={'sm:px-2 sm:py-1'} color="red">Inativo</Badge>,
        },
        {
            key: 'email',
            label: 'E-mail',
            cardBody: true,
        },
    ], []);

    const getHref = useCallback(
        item => can.view
            ? route('users.show', item.id)
            : route('users.index', { term, page: 1 }),
        [can.view, term],
    );

    return (
        <AuthenticatedLayout
            titleChildren="Gerenciamento de Usuários"
            breadcrumbs={[{ label: 'Usuários', url: route('users.index') }]}
        >
            {/* Toolbar */}
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
                        placeholder="Buscar usuários…"
                    />
                </div>
                {can.create && (
                    <Link
                        href={route('users.create')}
                        className="shrink-0 inline-flex items-center gap-2 h-10 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors no-underline"
                    >
                        <Plus size={16} />
                        <span className="hidden sm:inline">Novo usuário</span>
                    </Link>
                )}
            </div>

            <DataTable
                layout="cards"
                columns={columns}
                rows={users.data}
                href={getHref}
                empty="Nenhum usuário encontrado."
            />

            <Pagination data={users} count={count} />
        </AuthenticatedLayout>
    );
}

export default Index;
