import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import ShowField from "@/Components/Dashboard/ShowField";
import Button from "@/Components/Form/Button";
import DeleteModal from "@/Components/Dashboard/DeleteModal";
import { ArrowLeft, Pencil } from "lucide-react";

function Show({ group, can }) {
    return (
        <>
            <Head title="Detalhes da Página" />
            <AuthenticatedLayout
                titleChildren="Detalhes da Página"
                breadcrumbs={[
                    { label: 'Páginas', url: route('groups.index') },
                    { label: group.description, url: route('groups.show', group.id) },
                ]}
            >
                <Panel className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ShowField label="Descrição">{group.description}</ShowField>
                        <ShowField label="Criado em">{group.created_at}</ShowField>
                        <ShowField label="Atualizado em">{group.updated_at}</ShowField>
                    </div>
                </Panel>

                <Panel className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <Button href={route('groups.index')} className="gap-2">
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    {can.update && (
                        <Button href={route('groups.edit', group.id)} className="gap-2" color="yellow">
                            <Pencil size={20} />
                            <span>Editar</span>
                        </Button>
                    )}
                    {can.delete && <DeleteModal url={route('groups.destroy', group.id)} />}
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}

export default Show;
