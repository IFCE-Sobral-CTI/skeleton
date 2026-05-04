import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import ShowField from "@/Components/Dashboard/ShowField";
import Badge from "@/Components/Dashboard/Badge";
import Button from "@/Components/Form/Button";
import DeleteModal from "@/Components/Dashboard/DeleteModal";
import { ArrowLeft, Pencil, RefreshCw } from "lucide-react";

const TYPE_META = {
    success: { label: 'Sucesso',    color: 'green'  },
    warning: { label: 'Atenção',    color: 'yellow' },
    danger:  { label: 'Urgente',    color: 'red'    },
    info:    { label: 'Informação', color: 'blue'   },
};

export default function Show({ notification, recipients }) {
    const typeMeta = TYPE_META[notification.type] ?? TYPE_META.info;

    const readCount = recipients.filter(r => r.is_read).length;

    return (
        <>
            <Head title="Detalhes da Notificação" />
            <AuthenticatedLayout
                titleChildren="Detalhes da Notificação"
                breadcrumbs={[
                    { label: 'Notificações', url: route('my-notifications.index') },
                    { label: 'Gerenciar',    url: route('notifications.index') },
                    { label: notification.title },
                ]}
            >
                <Panel className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ShowField label="Tipo">
                            <Badge color={typeMeta.color}>{typeMeta.label}</Badge>
                        </ShowField>

                        <ShowField label="Destinatários">
                            <span className="text-sm">
                                {recipients.length} usuário{recipients.length !== 1 ? 's' : ''}
                                {readCount > 0 && ` · ${readCount} ${readCount !== 1 ? 'leram' : 'leu'}`}
                            </span>
                        </ShowField>

                        <div className="sm:col-span-2">
                            <ShowField label="Título">{notification.title}</ShowField>
                        </div>

                        <div className="sm:col-span-2">
                            <ShowField label="Mensagem">
                                <p className="whitespace-pre-line text-sm">{notification.message}</p>
                            </ShowField>
                        </div>

                        {notification.url && (
                            <div className="sm:col-span-2">
                                <ShowField label="Link">
                                    <a
                                        href={notification.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-green-700 hover:underline break-all"
                                    >
                                        {notification.url}
                                    </a>
                                </ShowField>
                            </div>
                        )}

                        <ShowField label="Enviada em">{notification.created_at}</ShowField>
                    </div>

                    <div className="border-t border-neutral-200 pt-4">
                        <h3 className="text-sm font-semibold text-neutral-800 mb-3">Destinatários</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-neutral-200">
                                        <th className="text-left py-2 px-3 font-semibold text-neutral-500">Usuário</th>
                                        <th className="text-left py-2 px-3 font-semibold text-neutral-500">E-mail</th>
                                        <th className="text-left py-2 px-3 font-semibold text-neutral-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipients.map(r => (
                                        <tr key={r.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                                            <td className="py-2 px-3">
                                                {r.name
                                                    ? <span className="font-medium text-neutral-800">{r.name}</span>
                                                    : <span className="text-neutral-400">Desconhecido</span>
                                                }
                                            </td>
                                            <td className="py-2 px-3 text-neutral-600">{r.email ?? '—'}</td>
                                            <td className="py-2 px-3">
                                                {r.is_read
                                                    ? <Badge color="gray">Lida em {r.read_at}</Badge>
                                                    : <Badge color="green">Não lida</Badge>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Panel>

                <Panel className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <Button href={route('notifications.index')} className="gap-2">
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>

                    <Button href={route('notifications.edit', notification.id)} color="yellow" className="gap-2">
                        <Pencil size={20} />
                        <span>Editar</span>
                    </Button>

                    <Button href={route('notifications.resend', notification.id)} color="violet" className="gap-2">
                        <RefreshCw size={20} />
                        <span>Reenviar</span>
                    </Button>

                    <DeleteModal url={route('notifications.destroy', notification.id)} />
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}
