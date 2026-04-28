import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import React from 'react';

/**
 * columns: Array<{
 *   key: string,
 *   label: string,
 *   render?: (row) => ReactNode,
 *   primary?: boolean,
 *   mobileSub?: (row) => string,
 *   sub?: boolean,
 *   badge?: boolean,
 *   cardBody?: boolean,
 *   tableClass?: string,
 *   thClass?: string,
 *   tdClass?: string,
 * }>
 *
 * rows:   any[]
 * href:   (row) => string | null
 * empty:  string
 * layout: 'table' | 'cards'   default 'table'
 */

// Fora do componente: sem recriação por render.
function cellValue(col, row) {
    return col.render ? col.render(row) : (row[col.key] ?? '—');
}

function getInitials(primaryCol, row) {
    if (!primaryCol) return '?';
    return String(row[primaryCol.key] ?? '')
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export default function DataTable({ columns, rows, href, empty, layout = 'table' }) {
    const primaryCol   = columns.find(c => c.primary);
    const subCols      = columns.filter(c => c.sub);
    const badgeCols    = columns.filter(c => c.badge);
    const cardBodyCols = columns.filter(c => c.cardBody);

    if (!rows?.length) {
        return (
            <p className="py-10 text-center text-sm text-neutral-400">
                {empty ?? 'Nenhum registro encontrado.'}
            </p>
        );
    }

    /* ─── Cards layout ──────────────────────────────────────────── */
    if (layout === 'cards') {
        return (
            <div className="flex flex-col gap-2">
                {rows.map(row => {
                    const url = href?.(row);
                    return (
                        <div
                            key={row.id}
                            className="bg-white rounded-lg border border-neutral-200 px-4 py-3 flex items-center gap-4 hover:border-green-200 hover:shadow-sm transition-all"
                        >
                            {/* Avatar */}
                            <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold select-none">
                                {getInitials(primaryCol, row)}
                            </div>

                            {/* Identidade */}
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm text-neutral-900 truncate">
                                    {primaryCol ? cellValue(primaryCol, row) : '—'}
                                </div>
                                {primaryCol?.mobileSub && (
                                    <div className="text-xs text-neutral-500 truncate mt-0.5">
                                        {primaryCol.mobileSub(row)}
                                    </div>
                                )}
                                {subCols.map(col => (
                                    <div key={col.key} className="text-xs text-neutral-500 truncate">
                                        {cellValue(col, row)}
                                    </div>
                                ))}
                                {cardBodyCols.map(col => (
                                    <div key={col.key} className="text-xs text-neutral-400 truncate">
                                        {cellValue(col, row)}
                                    </div>
                                ))}
                            </div>

                            {/* Badges */}
                            {badgeCols.length > 0 && (
                                <div className="shrink-0 hidden sm:flex items-center gap-1.5">
                                    {badgeCols.map(col => (
                                        <span key={col.key}>{cellValue(col, row)}</span>
                                    ))}
                                </div>
                            )}

                            {/* Ação */}
                            {url && (
                                <Link
                                    href={url}
                                    className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-200 text-black hover:bg-neutral-300 transition-colors no-underline"
                                >
                                    <ChevronRight size={15} />
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    /* ─── Table layout (default) ────────────────────────────────── */
    return (
        <>
            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-neutral-200">
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className={[
                                        'px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500',
                                        col.tableClass ?? '',
                                        col.thClass ?? '',
                                    ].join(' ')}
                                >
                                    {col.label}
                                </th>
                            ))}
                            <th className="w-16" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {rows.map(row => {
                            const url = href?.(row);
                            return (
                                <tr key={row.id} className="group transition-colors hover:bg-neutral-50">
                                    {columns.map(col => (
                                        <td
                                            key={col.key}
                                            className={[
                                                'px-3 py-3 text-neutral-700',
                                                col.tableClass ?? '',
                                                col.tdClass ?? '',
                                            ].join(' ')}
                                        >
                                            {cellValue(col, row)}
                                        </td>
                                    ))}
                                    <td className="px-3 w-16 text-right">
                                        {url && (
                                            <Link
                                                href={url}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors no-underline"
                                            >
                                                <ChevronRight size={15} />
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile: list cards */}
            <div className="md:hidden divide-y divide-neutral-100">
                {rows.map(row => {
                    const url = href?.(row);
                    const card = (
                        <div className="flex items-center gap-3 py-3 px-1">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold select-none">
                                {getInitials(primaryCol, row)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-neutral-900 truncate">
                                    {primaryCol ? cellValue(primaryCol, row) : '—'}
                                </div>
                                {primaryCol?.mobileSub && (
                                    <div className="text-xs text-neutral-500 truncate">
                                        {primaryCol.mobileSub(row)}
                                    </div>
                                )}
                                {subCols.map(col => (
                                    <div key={col.key} className="text-xs text-neutral-500 truncate">
                                        {cellValue(col, row)}
                                    </div>
                                ))}
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                {badgeCols.map(col => (
                                    <span key={col.key}>{cellValue(col, row)}</span>
                                ))}
                                {url && (
                                    <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center">
                                        <ChevronRight size={15} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );

                    return url
                        ? <Link key={row.id} href={url} className="block no-underline hover:bg-neutral-50 transition-colors">{card}</Link>
                        : <div key={row.id}>{card}</div>;
                })}
            </div>
        </>
    );
}
