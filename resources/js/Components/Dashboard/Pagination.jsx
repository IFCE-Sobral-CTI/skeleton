import { Link } from "@inertiajs/react";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const active   = "inline-flex items-center gap-1.5 px-3 h-9 text-sm font-medium rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors no-underline select-none";
const disabled = "inline-flex items-center gap-1.5 px-3 h-9 text-sm font-medium rounded-lg border border-neutral-100 bg-neutral-50 text-neutral-300 cursor-default select-none";

function Pagination({ data, count }) {
    return (
        <nav className="flex items-center justify-between pt-6">
            <p className="text-xs text-neutral-500">
                <span className="font-semibold text-neutral-700">{count}</span> registros
                <span className="mx-1.5 text-neutral-300">·</span>
                Página{" "}
                <span className="font-semibold text-neutral-700">{data.current_page}</span>
                {" "}de{" "}
                <span className="font-semibold text-neutral-700">{data.last_page}</span>
            </p>

            <div className="flex items-center gap-2">
                {data.prev_page_url
                    ? <Link href={data.prev_page_url} preserveState preserveScroll className={active}>
                        <ChevronLeft size={15} />
                        Anterior
                      </Link>
                    : <span className={disabled}>
                        <ChevronLeft size={15} />
                        Anterior
                      </span>
                }
                {data.next_page_url
                    ? <Link href={data.next_page_url} preserveState preserveScroll className={active}>
                        Próxima
                        <ChevronRight size={15} />
                      </Link>
                    : <span className={disabled}>
                        Próxima
                        <ChevronRight size={15} />
                      </span>
                }
            </div>
        </nav>
    );
}

export default Pagination;
