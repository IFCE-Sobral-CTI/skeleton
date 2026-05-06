import React, { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Footer from '@/Components/Public/Footer';
import Panel from '@/Components/Public/Panel';
import Navbar from '@/Components/Public/Navbar';
import Header from '@/Components/Public/Header';
import { ChevronUp, Search } from "lucide-react";

export default function Faq({ faqs }) {
    const [term, setTerm] = useState('');
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const debounce = setTimeout(() => {
            router.visit(route(route().current()), {data: {term: term}, preserveState: true, replace: true});
        }, 300);

        return () => clearTimeout(debounce);
    }, [term]);

    const toggleQuestion = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    const result = faqs.map((item, i, ar) => {
        const isOpen = openIndex === i;

        return (
            <div
                className={"border-neutral-200 bg-white border" + (i == 0? " rounded-t-lg": (i == ar.length-1)? " rounded-b-lg border-t-0" : " border-t-0")}
                key={'faq-'+i}
            >
                <h2 className={"mb-0"} id={"heading-" + i}>
                    <button
                        className={
                            "group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition hover:z-2 focus:z-3 focus:outline-none" +
                            (isOpen ? "" : "") +
                            (i == 0 && !isOpen ? " rounded-t-lg" : "") +
                            (i == ar.length-1 && !isOpen ? " rounded-b-lg" : "")
                        }
                        type="button"
                        onClick={() => toggleQuestion(i)}
                        aria-expanded={isOpen}
                        aria-controls={"question-"+i}
                    >
                        {item.question}
                        <span
                            className={"ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out fill-[#336dec]" + (isOpen ? " rotate-0" : " rotate-180")}
                        >
                            <ChevronUp className="h-6 w-6" />
                        </span>
                    </button>
                </h2>
                <div
                    id={"question-"+i}
                    className={isOpen ? "visible bg-neutral-100 py-4 px-5" : "hidden"}
                    aria-labelledby={"heading" + i}
                >
                    <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                </div>
            </div>
        )
    });

    return (
        <>
            <Head title="Principal" />
            <div className="flex flex-col items-start w-screen min-h-screen bg-neutral-100 text-neutral-700">
                <Navbar />
                <main className="flex-1 w-full md:p-2">
                    <div className="flex flex-col gap-4">
                        <Header title="Perguntas e Respostas" subtitle="Respostas sobre perguntas frequentes sobre o sistema de requisição de cartão de acesso ao restaurante acadêmico." />
                        <Panel className={'relative flex flex-wrap justify-between gap-2'}>
                            <input type="search" value={term} onChange={e => setTerm(e.target.value)} className="w-full border rounded-md focus:ring focus:ring-green-200 focus:border-green" placeholder="Faça sua pesquisa" />
                            <span className="absolute z-10 flex items-center p-2 top-4 right-2 md:right-4 h-7 md:h-10">
                                <Search size={20} />
                            </span>
                        </Panel>
                        <Panel className={'mt-2 flex flex-col gap-2'}>
                            <div>
                                {result}
                            </div>
                        </Panel>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
