import { Link } from "@inertiajs/react";
import React from "react";

function Breadcrumbs({ href = [] }) {
    const items = href?.length
        ? [{ label: 'Principal', url: route('home') }, ...href]
        : [{ label: 'Principal' }];

    return (
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3 flex-wrap">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <span className="text-neutral-300">/</span>}
                    {item.url && i < items.length - 1 ? (
                        <Link href={item.url} className="text-neutral-600 font-medium no-underline hover:text-green-700">
                            {item.label}
                        </Link>
                    ) : (
                        <span className={i === items.length - 1 ? 'text-neutral-800 font-semibold' : ''}>
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}

export default Breadcrumbs;
