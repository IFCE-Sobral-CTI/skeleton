import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ children }) {
    const { title } = usePage().props;
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
            <div className='w-full sm:max-w-md'>
                <h1 className='text-4xl font-extrabold text-center text-green'>
                    {title}
                </h1>
            </div>
            <div className="w-full px-6 py-4 mt-10 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
            <div className='mt-10'>
                <ApplicationLogo className="h-16 fill-current" />
            </div>
            <div className="flex items-center justify-center w-full mt-8 sm:max-w-md text-neutral-400">
                <Link href="#" className='flex-1 pr-6 text-right underline border-r border-neutral-400'>Fale Conosco</Link>
                <Link href="#" className='flex-1 pl-6 underline'>FAQ</Link>
            </div>
        </div>
    );
}
