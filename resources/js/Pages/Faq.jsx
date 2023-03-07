import React, { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Footer from '@/Components/Public/Footer';
import Panel from '@/Components/Public/Panel';
import Navbar from '@/Components/Public/Navbar';
import Header from '@/Components/Public/Header';
import 'tw-elements';

export default function Faq({ faqs }) {
    const [term, setTerm] = useState('');

    useEffect(() => {
        const debounce = setTimeout(() => {
            router.visit(route(route().current()), {data: {term: term}, preserveState: true, replace: true});
        }, 300);

        return () => clearTimeout(debounce);
    }, [term]);

    const result = faqs.map((item, i, ar) => {
        return (
            <div
                className={"border-neutral-200 bg-white border" + (i == 0? " rounded-t-lg": (i == ar.length-1)? " rounded-b-lg border-t-0" : " border-t-0")}
                key={'faq-'+i}
            >
                <h2 className={"mb-0" + (i == 0? " rounded-t-lg": (i == ar.length-1)? " rounded-b-lg border-t-0" : " border-t-0")} id={"heading-" + i}>
                    <button
                        className={
                            (i == 0)
                            ?"group relative flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                            :(i == ar.length-1)
                            ?"group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                            :"group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
                        }
                        type="button"
                        data-te-collapse-init
                        data-te-collapse-collapsed
                        data-te-target={"#question-"+i}
                        aria-expanded="false"
                        aria-controls={"question-"+i}
                    >
                        {item.question}
                        <span
                            className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </span>
                    </button>
                </h2>
                <div
                    id={"question-"+i}
                    className="!visible hidden bg-neutral-100"
                    data-te-collapse-item
                    aria-labelledby={"heading" + i}
                    data-te-parent="#accordionExample"
                >
                    <div className="py-4 px-5" dangerouslySetInnerHTML={{ __html: item.answer }}></div>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>
                        </Panel>
                        <Panel className={'mt-2 flex flex-col gap-2'}>
                            <div id="accordionExample">
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
