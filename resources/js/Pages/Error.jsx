import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { BrandLockup } from '@/Components/Brand';
import { ArrowLeft, Home, AlertTriangle, ShieldOff, Clock, ServerCrash, WifiOff } from 'lucide-react';

const ERRORS = {
    403: {
        icon: ShieldOff,
        title: 'Acesso negado',
        description: 'Você não tem permissão para acessar esta página. Se acredita que isso é um erro, entre em contato com o administrador do sistema.',
        color: 'from-warn-700 to-warn-500',
        accent: 'bg-warn-50 text-warn-700',
    },
    404: {
        icon: AlertTriangle,
        title: 'Página não encontrada',
        description: 'A página que você está procurando não existe ou foi removida. Verifique o endereço e tente novamente.',
        color: 'from-green-700 to-meruoca',
        accent: 'bg-green-50 text-green-700',
    },
    419: {
        icon: Clock,
        title: 'Sessão expirada',
        description: 'Sua sessão expirou por inatividade. Por segurança, recarregue a página e tente novamente.',
        color: 'from-green-700 to-meruoca',
        accent: 'bg-green-50 text-green-700',
    },
    429: {
        icon: WifiOff,
        title: 'Muitas requisições',
        description: 'Você realizou muitas tentativas em um curto período. Aguarde alguns instantes antes de tentar novamente.',
        color: 'from-neutral-700 to-neutral-900',
        accent: 'bg-neutral-100 text-neutral-700',
    },
    500: {
        icon: ServerCrash,
        title: 'Erro interno do servidor',
        description: 'Ocorreu um erro inesperado no servidor. Nossa equipe já foi notificada. Por favor, tente novamente em instantes.',
        color: 'from-red-700 to-red-600',
        accent: 'bg-red-50 text-red-700',
    },
    503: {
        icon: ServerCrash,
        title: 'Serviço temporariamente indisponível',
        description: 'O sistema está em manutenção ou temporariamente fora do ar. Tente novamente em alguns minutos.',
        color: 'from-neutral-700 to-neutral-900',
        accent: 'bg-neutral-100 text-neutral-700',
    },
};

const DEFAULT = {
    icon: AlertTriangle,
    title: 'Algo deu errado',
    description: 'Ocorreu um erro inesperado. Por favor, volte para a página anterior ou acesse a página inicial.',
    color: 'from-green-700 to-meruoca',
    accent: 'bg-green-50 text-green-700',
};

export default function Error({ status }) {
    const { icon: Icon, title, description, color, accent } = ERRORS[status] ?? DEFAULT;

    return (
        <>
            <Head title={`${status ? `Erro ${status}` : 'Erro'} — IFCE Campus Sobral`} />

            <div className="bg-neutral-50 min-h-screen flex flex-col">

                {/* Gov bar */}
                <div className="h-8 bg-green-700 text-white text-[11px] flex items-center px-6 tracking-[.04em] shrink-0">
                    <strong className="font-bold mr-2">GOV.BR</strong>
                    ·&nbsp;Ministério da Educação&nbsp;·&nbsp;Rede Federal
                </div>

                {/* Header */}
                <header className="h-[70px] px-8 flex items-center border-b border-neutral-200 bg-white shrink-0">
                    <Link href={route('home')}>
                        <BrandLockup />
                    </Link>
                </header>

                {/* Hero banner */}
                <div className={`bg-gradient-to-br ${color} text-white relative overflow-hidden`}>
                    <svg
                        className="absolute top-0 right-0 w-[340px] h-[200px] opacity-20 pointer-events-none"
                        viewBox="0 0 340 200"
                        aria-hidden="true"
                    >
                        {Array.from({ length: 7 }).map((_, r) =>
                            Array.from({ length: 11 }).map((_, c) => {
                                const op = (0.04 + Math.abs(Math.sin(c * 0.7 + r * 0.5)) * 0.10).toFixed(2);
                                return <rect key={`${r}-${c}`} x={c * 32} y={r * 32} width={26} height={26} rx={3} fill="#fff" opacity={op} />;
                            })
                        )}
                    </svg>
                    <div className="relative px-8 py-10 flex items-center gap-6">
                        <div className="text-[80px] font-extrabold tracking-tight leading-none opacity-20 select-none hidden sm:block">
                            {status}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Icon size={20} className="opacity-85" />
                                {status && (
                                    <span className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-75">
                                        Erro {status}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight leading-tight">
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Card central */}
                <div className="flex-1 flex items-start justify-center px-4 py-12">
                    <div className="bg-white border border-neutral-200 rounded-xl shadow-[var(--shadow-md)] p-8 max-w-lg w-full">

                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${accent}`}>
                            <Icon size={26} />
                        </div>

                        <h2 className="text-xl font-bold text-neutral-900 mb-3">{title}</h2>
                        <p className="text-sm text-neutral-600 leading-relaxed mb-8">{description}</p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href={route('home')}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors no-underline"
                            >
                                <Home size={16} />
                                Página inicial
                            </Link>
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                            >
                                <ArrowLeft size={16} />
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-5 px-8 border-t border-neutral-200 bg-white">
                    <div className="text-xs text-neutral-500 text-center">
                        © IFCE Campus Sobral · Av. Dr. Guarani, 317 — Derby Clube, Sobral/CE
                    </div>
                </footer>
            </div>
        </>
    );
}
