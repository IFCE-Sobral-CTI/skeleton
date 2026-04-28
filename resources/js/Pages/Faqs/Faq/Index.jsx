import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Dashboard/Pagination";
import Panel from "@/Components/Dashboard/Panel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Badge from "@/Components/Dashboard/Badge";
import { ChevronRight, Plus, Search } from "lucide-react";

function Index({ faqs, count, page, termSearch, can }) {
    const [term, setTerm] = useState(termSearch?? '');
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setCurrentPage(1);
            router.visit(route(route().current()), {data: {term: term, page: currentPage}, preserveState: true, replace: true});
        }, 300);

        return () => clearTimeout(debounce);
    }, [term]);

    const table = faqs.data.map((item, index) => {
        return (
            <tr key={index} className={"border-t transition hover:bg-neutral-100 " + (index % 2 == 0? 'bg-neutral-50': '')}>
                <td className="px-1 py-3 font-light">
                    <Link href={can.view? route('faqs.show', item.id): route('faqs.index', {term: term, page: currentPage})}>
                        <Badge color={'sky'}>{item.tag.description}</Badge>
                    </Link>
                </td>
                <td className="px-1 py-3 font-light"><Link href={can.view? route('faqs.show', item.id): route('faqs.index', {term: term, page: currentPage})}>{item.question}</Link></td>
                <td className="px-1 py-3 font-light"><Link href={can.view? route('faqs.show', item.id): route('faqs.index', {term: term, page: currentPage})} dangerouslySetInnerHTML={{ __html: item.answer }}></Link></td>
                <td className="flex justify-end py-3 pr-2 text-neutral-400">
                    <Link href={can.view? route('faqs.show', item.id): route('faqs.index', {term: term, page: currentPage})}>
                        <ChevronRight size={20} />
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <>
            <AuthenticatedLayout titleChildren={'Gerenciamento de FAQ'} breadcrumbs={[{ label: 'FAQ', url: route('faqs.index') }]}>
                <div className="flex gap-2 md:flex-row md:gap-4">
                    {can.create && <Panel className={'inline-flex'}>
                        <Link href={route('faqs.create')} className="inline-flex items-center justify-between gap-2 px-3 py-2 font-light text-white transition bg-blue-500 border border-transparent rounded-md focus:ring hover:bg-blue-600 focus:ring-sky-300">
                            <Plus size={20} />
                            <span>Novo</span>
                        </Link>
                    </Panel>}
                    <Panel className={'flex-1 relative'}>
                        <input type="search" value={term} onChange={e => setTerm(e.target.value)} className="w-full border rounded-md focus:ring focus:ring-green-200 focus:border-green" placeholder="Faça sua pesquisa" />
                        <span className="absolute z-10 flex items-center p-2 top-4 right-2 md:right-4 h-7 md:h-10">
                            <Search size={20} />
                        </span>
                    </Panel>
                </div>
                <Panel className="">
                    <table className="w-full table-auto text-neutral-600">
                        <thead>
                            <tr className="border-b">
                                <th className="px-1 pt-3 font-semibold text-left">Tag</th>
                                <th className="px-1 pt-3 font-semibold text-left">Pergunta</th>
                                <th className="px-1 pt-3 font-semibold text-left">Resposta</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                    <Pagination data={faqs} count={count} />
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Index;
