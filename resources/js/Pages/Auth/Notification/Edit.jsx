import React, { useCallback } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Input from "@/Components/Form/Input";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import { ArrowLeft, CircleCheck, Info, Save, TriangleAlert } from "lucide-react";

const TYPES = [
    { value: 'info',    label: 'Informação', Icon: Info,          ring: 'ring-info-500',  bg: 'bg-info-50',  text: 'text-info-500'  },
    { value: 'success', label: 'Sucesso',     Icon: CircleCheck,   ring: 'ring-green-500', bg: 'bg-green-50', text: 'text-green-600' },
    { value: 'warning', label: 'Atenção',     Icon: TriangleAlert, ring: 'ring-warn-500',  bg: 'bg-warn-50',  text: 'text-warn-700'  },
    { value: 'danger',  label: 'Urgente',     Icon: TriangleAlert, ring: 'ring-red-500',   bg: 'bg-red-50',   text: 'text-red-600'   },
];

export default function Edit({ notification }) {
    const { data, setData, patch, processing, errors } = useForm({
        title:   notification.title   ?? '',
        message: notification.message ?? '',
        type:    notification.type    ?? 'info',
        url:     notification.url     ?? '',
    });

    const onHandleChange = useCallback(e => setData(e.target.name, e.target.value), [setData]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        patch(route('notifications.update', notification.id));
    }, [patch, notification.id]);

    return (
        <>
            <Head title="Editar Notificação" />
            <AuthenticatedLayout
                titleChildren="Editar Notificação"
                breadcrumbs={[
                    { label: 'Notificações', url: route('my-notifications.index') },
                    { label: 'Gerenciar',    url: route('notifications.index') },
                    { label: notification.title, url: route('notifications.show', notification.id) },
                    { label: 'Editar' },
                ]}
            >
                <Panel>
                    <form onSubmit={handleSubmit} autoComplete="off">

                        {/* Tipo */}
                        <div className="mb-4">
                            <label className="font-light">Tipo</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
                                {TYPES.map(t => {
                                    const { Icon } = t;
                                    return (
                                        <label
                                            key={t.value}
                                            className={[
                                                'flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer select-none transition-colors',
                                                data.type === t.value
                                                    ? `border-current ring-2 ${t.ring} ${t.bg} ${t.text}`
                                                    : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400',
                                            ].join(' ')}
                                        >
                                            <input
                                                type="radio"
                                                name="type"
                                                value={t.value}
                                                checked={data.type === t.value}
                                                onChange={onHandleChange}
                                                className="sr-only"
                                            />
                                            <Icon size={15} className="shrink-0" />
                                            <span className="text-sm font-semibold">{t.label}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            <InputError message={errors.type} />
                        </div>

                        {/* Título */}
                        <div className="mb-4">
                            <label htmlFor="title" className="font-light">Título</label>
                            <Input
                                name="title"
                                value={data.title}
                                handleChange={onHandleChange}
                                placeholder="Título da notificação"
                                required
                            />
                            <InputError message={errors.title} />
                        </div>

                        {/* Mensagem */}
                        <div className="mb-4">
                            <label htmlFor="message" className="font-light">Mensagem</label>
                            <textarea
                                name="message"
                                id="message"
                                value={data.message}
                                onChange={onHandleChange}
                                rows={4}
                                maxLength={1000}
                                required
                                className="w-full border-neutral-400 focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 rounded-lg shadow-sm resize-none"
                            />
                            <div className="flex items-start justify-between">
                                <InputError message={errors.message} />
                                <span className="text-xs text-neutral-400 ml-auto">{data.message.length}/1000</span>
                            </div>
                        </div>

                        {/* Link */}
                        <div className="mb-6">
                            <label htmlFor="url" className="font-light">
                                Link <span className="text-neutral-400">(opcional)</span>
                            </label>
                            <Input
                                type="url"
                                name="url"
                                value={data.url}
                                handleChange={onHandleChange}
                                placeholder="https://…"
                            />
                            <InputError message={errors.url} />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                            <Button type="submit" processing={processing} color="green" className="gap-2">
                                <Save size={20} />
                                <span>Salvar alterações</span>
                            </Button>
                            <Button href={route('notifications.show', notification.id)} className="gap-2">
                                <ArrowLeft size={20} />
                                <span>Voltar</span>
                            </Button>
                        </div>
                    </form>
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}
