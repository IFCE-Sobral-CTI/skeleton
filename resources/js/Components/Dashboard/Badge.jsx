import React, { Children, useEffect, useState } from "react";
import { twMerge } from 'tailwind-merge';

export default function Badge({color, children, className}) {
    const [style, setStyle] = useState('');

    useEffect(() => {
        setStyle(`inline-flex py-1 px-2 rounded-md text-sm text-white bg-${color}-500`)
    });

    return (
        <div className={twMerge(className, style)}>{children}</div>
    )
}
