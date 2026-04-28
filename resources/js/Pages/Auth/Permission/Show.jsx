import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import ShowField from "@/Components/Dashboard/ShowField";
import Button from "@/Components/Form/Button";
import DeleteModal from "@/Components/Dashboard/DeleteModal";
import { ArrowLeft, List, Pencil } from "lucide-react";

function Show({ permission, can }) {
    return (
        <>
            <Head title="Detalhes da Permissão" />
            <AuthenticatedLayout
                titleChildren="Detalhes da Permissão"
                breadcrumbs={[
                    { label: 'Permissões', url: route('permissions.index') },
                    { label: permission.description, url: route('permissions.show', permission.id) },
                ]}
            >
                <Panel className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ShowField label="Descrição">{permission.description}</ShowField>
                        <ShowField label="Criado em">{permission.created_at}</ShowField>
                        <ShowField label="Atualizado em">{permission.updated_at}</ShowField>
                    </div>
                </Panel>

                <Panel>
                    <h2 className="mb-4 text-base font-semibold text-neutral-600">Regras associadas</h2>
                    <div className="grid gap-3 md:grid-cols-2">
                        {permission.rules.map(item => (
                            <div
                                key={item.id}
                                className="flex justify-between gap-2 px-3 py-2 rounded-lg border border-neutral-100 bg-neutral-50"
                            >
                                <ShowField label="Descrição">{item.description}</ShowField>
                                <ShowField label="Controle">{item.control}</ShowField>
                            </div>
                        ))}
                    </div>
                </Panel>

                <Panel className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <Button href={route('permissions.index')} className="gap-2">
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    {can.rules && (
                        <Button href={route('permissions.rules', permission.id)} className="gap-2" color="lime">
                            <List size={20} />
                            <span>Regras</span>
                        </Button>
                    )}
                    {can.update && (
                        <Button href={route('permissions.edit', permission.id)} className="gap-2" color="yellow">
                            <Pencil size={20} />
                            <span>Editar</span>
                        </Button>
                    )}
                    {can.delete && <DeleteModal url={route('permissions.destroy', permission.id)} />}
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}

export default Show;
