import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { BrandLockup } from '@/Components/Brand';
import { BookOpen, GraduationCap, Users } from "lucide-react";

function Welcome() {
    return (
        <>
            <Head title="IFCE Campus Sobral" />
            <div className="bg-white min-h-screen flex flex-col">

                {/* Gov bar */}
                <div className="h-8 bg-green-700 text-white text-[11px] flex items-center px-6 tracking-[.04em] shrink-0">
                    <strong className="font-bold mr-2">GOV.BR</strong>
                    ·&nbsp;Ministério da Educação&nbsp;·&nbsp;Rede Federal
                    <a href="#" className="text-white/85 ml-auto no-underline hover:text-white">Acessibilidade</a>
                </div>

                {/* Header */}
                <header className="h-[70px] px-8 flex items-center justify-between border-b border-neutral-200 bg-white shrink-0">
                    <BrandLockup />
                    <nav className="flex items-center gap-6 text-sm font-semibold">
                        <a href="#cursos" className="text-green-700 no-underline">Cursos</a>
                        <a href="#ingresso" className="text-neutral-800 no-underline">Ingresso</a>
                        <a href="#extensao" className="text-neutral-800 no-underline">Extensão</a>
                        <a href="#campus" className="text-neutral-800 no-underline">O Campus</a>
                        <a href="#noticias" className="text-neutral-800 no-underline">Notícias</a>
                        <Link
                            href={route('login')}
                            className="bg-green-500 text-white no-underline px-[18px] py-2 rounded text-[13px] font-semibold hover:bg-green-600 transition-colors"
                        >
                            Acessar sistema
                        </Link>
                    </nav>
                </header>

                {/* Hero */}
                <section className="relative px-8 py-16 bg-gradient-to-br from-green-700 to-meruoca text-white overflow-hidden">
                    <svg
                        className="absolute top-[-40px] right-[-60px] w-[460px] h-[360px] opacity-30 pointer-events-none"
                        viewBox="0 0 460 360"
                        aria-hidden="true"
                    >
                        {Array.from({ length: 11 }).map((_, r) =>
                            Array.from({ length: 14 }).map((_, c) => {
                                const op = (0.04 + Math.abs(Math.sin(c * 0.7 + r * 0.5)) * 0.10).toFixed(2);
                                return <rect key={`${r}-${c}`} x={c * 32} y={r * 32} width={26} height={26} rx={3} fill="#fff" opacity={op} />;
                            })
                        )}
                    </svg>
                    <div className="relative max-w-[640px]">
                        <div className="text-[11px] font-extrabold tracking-[0.16em] uppercase opacity-85 mb-3">
                            IFCE · Campus Sobral
                        </div>
                        <h1 className="text-[44px] font-extrabold tracking-tight leading-[1.05] mb-4">
                            Educação pública, gratuita e de qualidade no coração da Serra da Meruoca.
                        </h1>
                        <p className="text-[17px] opacity-90 mb-6 max-w-[520px] leading-relaxed">
                            Ensino técnico, superior e pós-graduação em um dos campi mais antigos do IFCE. Inscrições abertas para 2026.2.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#cursos"
                                className="bg-white text-green-700 no-underline px-6 py-3 rounded font-bold text-sm border-0"
                            >
                                Ver cursos
                            </a>
                            <a
                                href="#ingresso"
                                className="bg-transparent text-white no-underline px-6 py-3 rounded font-bold text-sm border border-white/40"
                            >
                                Inscrever-se
                            </a>
                        </div>
                    </div>
                </section>

                {/* Cards de modalidades */}
                <section id="cursos" className="px-8 py-12">
                    <div className="grid grid-cols-3 gap-5 mb-12">
                        {[
                            {
                                title: 'Ensino Técnico',
                                desc: 'Integrado ao Médio e Subsequente em 6 áreas profissionais.',
                                icon: <GraduationCap size={22} />,
                            },
                            {
                                title: 'Ensino Superior',
                                desc: 'Engenharias, Licenciaturas e Tecnologias reconhecidas pelo MEC.',
                                icon: <BookOpen size={22} />,
                            },
                            {
                                title: 'Extensão',
                                desc: 'Projetos conectando o campus à comunidade sobralense e regional.',
                                icon: <Users size={22} />,
                            },
                        ].map(({ title, desc, icon }, i) => (
                            <div
                                key={i}
                                className="bg-white border border-neutral-200 rounded-lg p-6 flex flex-col gap-3 shadow-[var(--shadow-xs)] cursor-pointer transition-[box-shadow,transform] hover:shadow-[var(--shadow-md)]"
                            >
                                <div className="w-11 h-11 rounded-lg bg-green-50 text-green-700 flex items-center justify-center">
                                    {icon}
                                </div>
                                <div className="text-base font-bold text-neutral-900">{title}</div>
                                <div className="text-sm text-neutral-600 leading-relaxed">{desc}</div>
                                <a href="#" className="text-[13px] font-semibold text-green-700 no-underline">Saiba mais →</a>
                            </div>
                        ))}
                    </div>

                    {/* Notícias */}
                    <div id="noticias">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-extrabold text-neutral-900">Últimas notícias</h2>
                            <a href="#" className="text-[13px] font-semibold text-green-700 no-underline">Todas as notícias →</a>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            {[
                                { date: '22 mai', title: 'Semana de Extensão chega à 12ª edição', summary: 'Inscrições abertas para comunidade e estudantes.', color: 'bg-gradient-to-br from-green-500 to-green-700' },
                                { date: '18 mai', title: 'Pesquisa em energia solar recebe financiamento CNPq', summary: 'Projeto do Laboratório de Elétrica.', color: 'bg-gradient-to-br from-meruoca to-green-700' },
                                { date: '12 mai', title: 'Processo seletivo 2026.2 divulgado', summary: 'Matemática, Elétrica e novos cursos técnicos.', color: 'bg-gradient-to-br from-terra to-red-600' },
                            ].map(({ date, title, summary, color }, i) => (
                                <div key={i} className="bg-white border border-neutral-200 rounded-lg overflow-hidden cursor-pointer shadow-[var(--shadow-xs)]">
                                    <div className={`h-[120px] ${color}`} />
                                    <div className="p-5 flex flex-col gap-1.5">
                                        <span className="text-[11px] font-bold text-neutral-500 tracking-[.04em]">{date}</span>
                                        <div className="text-[15px] font-bold text-neutral-900 leading-snug">{title}</div>
                                        <div className="text-[13px] text-neutral-600">{summary}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-auto p-8 bg-neutral-900 text-white/70">
                    <div className="flex items-center justify-between">
                        <BrandLockup inverse />
                        <div className="text-xs">
                            © IFCE Campus Sobral · Av. Dr. Guarani, 317 — Derby Clube, Sobral/CE
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Welcome;
