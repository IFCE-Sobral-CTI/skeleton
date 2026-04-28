import React from "react";
import { twMerge } from 'tailwind-merge';

const colorMap = {
    green:  'bg-green-600 text-white',
    red:    'bg-red-500 text-white',
    blue:   'bg-blue-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    violet: 'bg-violet-500 text-white',
    orange: 'bg-orange-500 text-white',
    gray:   'bg-neutral-500 text-white',
};

export default function Badge({ color, children, className }) {
    const base = 'inline-flex items-center py-0.5 px-2 rounded-md text-xs font-medium';
    const colors = colorMap[color] ?? 'bg-neutral-500 text-white';

    return (
        <span className={twMerge(base, colors, className)}>
            {children}
        </span>
    );
}
