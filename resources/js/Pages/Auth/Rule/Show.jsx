import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import ShowField from "@/Components/Dashboard/ShowField";
import Button from "@/Components/Form/Button";
import DeleteModal from "@/Components/Dashboard/DeleteModal";
import { ArrowLeft, Pencil } from "lucide-react";

function Show({ rule, can }) {
    return (
        <>
            <Head title="Detalhes da Regra" />
            <AuthenticatedLayout
                titleChildren="Detalhes da Regra"
                breadcrumbs={[
                    { label: 'Regras', url: route('rules.index') },
                    { label: rule.description, url: route('rules.show', rule.id) },
                ]}
            >
                <Panel className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ShowField label="Descrição">{rule.description}</ShowField>
                        <ShowField label="Grupo">{rule.group.description}</ShowField>
                        <ShowField label="Controle">{rule.control}</ShowField>
                        <ShowField label="Criado em">{rule.created_at}</ShowField>
                        <ShowField label="Atualizado em">{rule.updated_at}</ShowField>
                    </div>
                </Panel>

                <Panel className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <Button href={route('rules.index')} className="gap-2">
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    {can.update && (
                        <Button href={route('rules.edit', rule.id)} className="gap-2" color="yellow">
                            <Pencil size={20} />
                            <span>Editar</span>
                        </Button>
                    )}
                    {can.delete && <DeleteModal url={route('rules.destroy', rule.id)} />}
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}

export default Show;
