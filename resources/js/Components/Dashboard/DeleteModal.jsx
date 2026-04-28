import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Check, Trash2, X } from "lucide-react";
import Button from "@/Components/Form/Button";

export default function DeleteModal({ url }) {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState(false);

    // Fecha com ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    const submit = (e) => {
        e.preventDefault();
        destroy(url, { preserveScroll: true });
    };

    return (
        <>
            {/* Botão de disparo */}
            <Button color="red" onClick={() => setOpen(true)} className="gap-2">
                <Trash2 size={20} />
                <span>Apagar</span>
            </Button>

            {/* Overlay + diálogo */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="w-full max-w-md bg-white rounded-xl shadow-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Cabeçalho */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                            <h2 className="text-base font-semibold text-neutral-800">
                                Apagar registro
                            </h2>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="p-1 rounded-md bg-transparent border-0 text-neutral-400 cursor-pointer hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                                aria-label="Fechar"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Corpo */}
                        <div className="px-6 py-5 text-sm text-neutral-600">
                            Deseja realmente excluir este registro? Esta ação não pode ser desfeita.
                        </div>

                        {/* Rodapé */}
                        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-neutral-100">
                            <Button onClick={() => setOpen(false)} className="gap-2">
                                <X size={15} />
                                Cancelar
                            </Button>
                            <form onSubmit={submit}>
                                <Button type="submit" processing={processing} color="red" className="gap-2">
                                    <Check size={15} />
                                    Sim, apagar
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
