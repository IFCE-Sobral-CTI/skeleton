import React from 'react';
import { usePage } from '@inertiajs/react';
import { BrandLockup } from '@/Components/Brand';

export default function Guest({ children }) {
    const { title } = usePage().props;

    return (
        <div className="grid grid-cols-2 min-h-screen">

            {/* Coluna esquerda — gradiente institucional */}
            <div className="relative bg-gradient-to-br from-green-700 to-meruoca text-white p-12 overflow-hidden flex flex-col justify-between">

                {/* Padrão decorativo */}
                <svg
                    className="absolute top-[-20px] right-[-40px] w-[320px] h-[460px] opacity-45 pointer-events-none"
                    viewBox="0 0 300 420"
                    aria-hidden="true"
                >
                    {Array.from({ length: 14 }).map((_, r) =>
                        Array.from({ length: 10 }).map((_, c) => {
                            const op = (0.04 + Math.abs(Math.sin(c * 0.7 + r * 0.5)) * 0.08).toFixed(2);
                            return <rect key={`${r}-${c}`} x={c * 30} y={r * 30} width={24} height={24} rx={3} fill="#fff" opacity={op} />;
                        })
                    )}
                </svg>

                <div className="relative z-10">
                    <BrandLockup inverse />
                </div>

                <div className="relative z-10">
                    <div className="text-[11px] font-extrabold tracking-[0.16em] uppercase opacity-85">
                        {title || 'Sistema IFCE'}
                    </div>
                    <div className="text-[36px] font-extrabold tracking-[-0.02em] mt-2 leading-[1.05]">
                        Bem-vindo ao Campus Sobral.
                    </div>
                    <p className="opacity-85 mt-3 max-w-[320px] text-sm leading-relaxed">
                        Acesse matrículas, declarações, frequência e solicitações em um só lugar.
                    </p>
                </div>

                <div className="relative z-10 text-[11px] opacity-70">
                    Rede Federal de Educação Profissional, Científica e Tecnológica
                </div>
            </div>

            {/* Coluna direita — formulário */}
            <div className="px-10 py-12 flex flex-col justify-center bg-white">
                <div className="max-w-[360px] w-full mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
