import { Link } from "@inertiajs/react";
import React from "react";

export default function Footer() {
    return (
        <>
            <footer className="flex flex-col items-center justify-center w-full p-3 md:flex-row md:gap-8 bg-neutral-200 md:p-2">
                <div className="flex items-center">
                    <div className='flex justify-end md:p-2'>
                        <img src={route().t.url + "/img/logo_vertical_branco.svg"} className="h-16 md:h-20" style={{ filter: 'brightness(50%)' }} title="IFCE - Campus Sobral"/>
                    </div>
                    <section className="md:flex-1 text-neutral-500">
                        <p className='font-normal'>Instituto Federal do Ceará - IFCE</p>
                        <p className='text-sm font-normal'><em>Campus</em> Sobral</p>
                        <p className='text-xs font-light'>Coordenadoria de Tecnologia da Informação</p>
                    </section>
                </div>
                <section className="flex justify-between gap-4 mt-2 font-light md:flex-col md:gap-0">
                    <span className="hidden font-normal md:inline-block">Links úteis:</span>
                    <Link className="pr-4 underline border-r md:ml-2 md:border-0 border-neutral-400">Fale conosco</Link>
                    <Link href={route('faq', 'admin')} className="pr-4 underline border-r md:ml-2 md:border-0 border-neutral-400">FAQ</Link>
                    <Link className="underline md:ml-2">Reportar erro</Link>
                </section>
            </footer>
        </>
    )
}
