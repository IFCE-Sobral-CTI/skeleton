import React from 'react';

export default function ShowField({label, children}) {
    return (
        <div className="flex flex-col">
            <div className="text-sm font-light">{label}</div>
            <div className="">{children}</div>
        </div>
    )
}
