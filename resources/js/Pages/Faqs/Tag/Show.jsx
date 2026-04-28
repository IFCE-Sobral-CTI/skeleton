import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Button from "@/Components/Form/Button";
import DeleteModal from "@/Components/Dashboard/DeleteModal";
import ShowField from "@/Components/Dashboard/ShowField";
import { ArrowLeft, Pencil } from "lucide-react";

function Show({ tag, can }) {
    return (
        <>
            <Head title="Detalhes da Página" />
            <AuthenticatedLayout
                titleChildren={'Detalhes da Tag'}
                breadcrumbs={[
                    { label: 'Tags', url: route('tags.index') },
                    { label: tag.description, url: route('tags.show', tag.id) }
                ]}
            >
                <Panel className={'flex flex-col gap-4'}>
                    <ShowField label={'Descrição'}>
                        {tag.description}
                    </ShowField>
                    <ShowField label={'Criado em'}>
                        {tag.created_at}
                    </ShowField>
                    <ShowField label={'Atualizado em'}>
                        {tag.updated_at}
                    </ShowField>
                </Panel>
                <Panel className={'flex flex-wrap items-center justify-center gap-1 md:gap-4'}>
                    <Button href={route('tags.index')} className={'gap-2'}>
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    {can.update && <Button href={route('tags.edit', tag.id)} className={'gap-2'} color={'yellow'}>
                        <Pencil size={20} />
                        <span>Editar</span>
                    </Button>}
                    {can.delete && <DeleteModal url={route('tags.destroy', tag.id)} />}
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Show;

