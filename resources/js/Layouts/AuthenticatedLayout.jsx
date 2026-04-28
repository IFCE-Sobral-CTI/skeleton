import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import Breadcrumbs from '@/Components/Dashboard/Breadcrumbs';
import Alert from '@/Components/Dashboard/Alert';
import AlertContext from '@/Context/AlertContext';
import Navbar from '@/Components/Dashboard/Navbar';

export default function AuthenticatedLayout({ breadcrumbs, children, titleChildren }) {
    const { title, flash, authorizations } = usePage().props;
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState(flash?.flash?.message);
    const [type, setType] = useState(flash?.flash?.status);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (flash?.flash) {
            setMessage(flash.flash.message);
            setType(flash.flash.status);
            setAlert(true);
        }
    }, [flash]);

    return (
        <AlertContext.Provider value={{ alert, setAlert, type, setType, message, setMessage }}>
            <Head title={title || 'Dashboard'} />

            {/* Shell */}
            <div className="flex flex-col h-screen overflow-hidden">

                {/* Gov bar */}
                <div className="h-8 bg-green-700 text-white text-[11px] flex items-center px-6 tracking-[.04em] shrink-0">
                    <strong className="font-bold mr-2">GOV.BR</strong>
                    ·&nbsp;Ministério da Educação&nbsp;·&nbsp;Rede Federal
                    <a href="#" className="text-white/85 ml-auto no-underline hover:text-white">
                        Acessibilidade
                    </a>
                </div>

                {/* Body */}
                <div className="flex flex-1 overflow-hidden relative">

                    {/* Mobile backdrop */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 z-40 bg-black/50 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    <Sidebar
                        can={authorizations}
                        open={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />

                    {/* Content column */}
                    <div className="flex flex-col flex-1 overflow-hidden min-w-0">
                        <Navbar onMenuToggle={() => setSidebarOpen(v => !v)} />

                        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-neutral-50">
                            <Alert />
                            {breadcrumbs && <Breadcrumbs href={breadcrumbs} />}
                            {titleChildren && (
                                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-neutral-900 mb-4 md:mb-5">
                                    {titleChildren}
                                </h1>
                            )}
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </AlertContext.Provider>
    );
}
