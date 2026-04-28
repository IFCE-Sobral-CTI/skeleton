import { Link } from "@inertiajs/react";
import React from "react";

// Fora do componente: objeto estático, sem recriação por render.
const COLOR_CLASSES = {
    green:   'bg-green-600 hover:bg-green-700 focus:ring-green-300',
    lime:    'bg-lime-500 hover:bg-lime-600 focus:ring-lime-300',
    blue:    'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300',
    fuchsia: 'bg-fuchsia-500 hover:bg-fuchsia-600 focus:ring-fuchsia-300',
    violet:  'bg-violet-500 hover:bg-violet-600 focus:ring-violet-300',
    sky:     'bg-sky-500 hover:bg-sky-600 focus:ring-sky-300',
    yellow:  'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300',
    red:     'bg-red-500 hover:bg-red-600 focus:ring-red-300',
};

const BASE = 'inline-flex items-center px-4 py-2 border border-transparent tracking-widest text-sm rounded-lg text-white transition ease-in-out duration-150 focus:ring-2';

function Button({ children, type = 'button', processing, className = '', onClick, color, href }) {
    const colors = COLOR_CLASSES[color] ?? 'bg-neutral-500 hover:bg-neutral-600 focus:ring-neutral-300';
    const cls = `${BASE} ${processing ? 'opacity-25 ' : ''}${colors} ${className}`;

    if (href) {
        return (
            <Link href={href} className={cls}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={cls}
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
