import React from 'react';
import { useState, useEffect } from 'react';

export default function Badge({children, color}) {
    const [bgColor, setBgColor] = useState('');

    useEffect(() => {
        switch(color) {
            case 'red':
                setBgColor('bg-red-500');
                break;
            case 'yellow':
                setBgColor('bg-yellow-500');
                break;
            case 'sky':
                setBgColor('bg-sky-500');
                break;
            case 'green':
                setBgColor('bg-green-500');
                break;
            case 'cyan':
                setBgColor('bg-cyan-500');
                break;
            default:
                setBgColor('bg-neutral-500');
        }
    }, []);

    return (
        <span className={"text-white text-sm px-2 py-1 font-light rounded-md " + bgColor}>{children}</span>
    )
}
