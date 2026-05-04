import React from "react";
import Input from "@/Components/Form/Input";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import SelectOnly from "@/Components/Form/SelectOnly";
import SelectMulti from "@/Components/Form/SelectMulti";
import { ArrowLeft, CircleCheck, Info, Mail, Send as SendIcon, TriangleAlert } from "lucide-react";

const TYPES = [
    { value: 'info',    label: 'Informação', Icon: Info,          ring: 'ring-info-500',  bg: 'bg-info-50',  text: 'text-info-500'  },
    { value: 'success', label: 'Sucesso',     Icon: CircleCheck,   ring: 'ring-green-500', bg: 'bg-green-50', text: 'text-green-600' },
    { value: 'warning', label: 'Atenção',     Icon: TriangleAlert, ring: 'ring-warn-500',  bg: 'bg-warn-50',  text: 'text-warn-700'  },
    { value: 'danger',  label: 'Urgente',     Icon: TriangleAlert, ring: 'ring-red-500',   bg: 'bg-red-50',   text: 'text-red-600'   },
];

const TARGETS = [
    { value: 'all',        label: 'Todos os usuários',    desc: 'Envia para todos os cadastrados.' },
    { value: 'permission', label: 'Por permissão',        desc: 'Envia para um grupo de permissão.' },
    { value: 'users',      label: 'Usuários específicos', desc: 'Selecione um ou mais usuários.' },
];

export default function Form({ data, errors, processing, handleSubmit, onHandleChange, setData, users, permissions }) {
    return (
        <form onSubmit={handleSubmit} autoComplete="off">

            {/* Destinatários */}
            <div className="mb-4">
                <label className="font-light">Destinatários</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                    {TARGETS.map(t => (
                        <label
                            key={t.value}
                            className={[
                                'flex flex-col gap-1 p-4 rounded-lg border-2 cursor-pointer select-none transition-colors',
                                data.target === t.value
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-neutral-300 bg-white hover:border-neutral-400',
                            ].join(' ')}
                        >
                            <input
                                type="radio"
                                name="target"
                                value={t.value}
                                checked={data.target === t.value}
                                onChange={onHandleChange}
                                className="sr-only"
                            />
                            <span className="text-sm font-semibold text-neutral-900">{t.label}</span>
                            <span className="text-xs text-neutral-500 leading-snug">{t.desc}</span>
                        </label>
                    ))}
                </div>
                <InputError message={errors.target} />
            </div>

            {data.target === 'permission' && (
                <SelectOnly
                    label="Permissão"
                    name="permission_id"
                    data={permissions}
                    value={data.permission_id}
                    onChange={onHandleChange}
                    error={errors.permission_id}
                />
            )}

            {data.target === 'users' && (
                <SelectMulti
                    label="Usuários"
                    name="user_ids"
                    data={users}
                    value={data.user_ids}
                    onChange={e => setData('user_ids', e.target.value)}
                    error={errors.user_ids}
                />
            )}

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
                    placeholder="Ex.: Manutenção programada"
                    required
                />
                <InputError message={errors.title} />
            </div>

            {/* Mensagem */}
            <div className="mb-0">
                <label htmlFor="message" className="font-light">Mensagem</label>
                <textarea
                    name="message"
                    id="message"
                    value={data.message}
                    onChange={onHandleChange}
                    placeholder="Descreva o conteúdo da notificação…"
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

            {/* Link opcional */}
            <div className="mb-4">
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

            {/* Enviar por e-mail */}
            <div className="mb-4">
                <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        name="send_email"
                        checked={data.send_email}
                        onChange={e => setData('send_email', e.target.checked)}
                        className="w-4 h-4 rounded border-neutral-400 text-green-600 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    />
                    <span className="font-light flex items-center gap-2">
                        <Mail size={15} className="text-neutral-500" />
                        Enviar também por e-mail
                    </span>
                </label>
                <InputError message={errors.send_email} />
            </div>

            {/* Ações */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <Button type="submit" processing={processing} color="green" className="gap-2">
                    <SendIcon size={18} />
                    <span>Enviar notificação</span>
                </Button>
                <Button href={route('notifications.index')} className="gap-2">
                    <ArrowLeft size={18} />
                    <span>Voltar</span>
                </Button>
            </div>
        </form>
    );
}
