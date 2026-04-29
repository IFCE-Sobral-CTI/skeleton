import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Button from "@/Components/Form/Button";
import DeleteModal from "@/Components/Dashboard/DeleteModal";
import { decode, encode } from "html-entities";
import ShowField from "@/Components/Dashboard/ShowField";
import Badge from "@/Components/Dashboard/Badge";
import { ArrowLeft, Pencil } from "lucide-react";

function Show({ faq, can }) {
    return (
        <>
            <Head title="Detalhes do FAQ" />
            <AuthenticatedLayout titleChildren={'Detalhes do FAQ'} breadcrumbs={[{ label: 'FAQ', url: route('faqs.index') }, { label: faq.question, url: route('faqs.show', faq.id) }]}>
                <Panel className={'flex flex-col gap-4'}>
                    <ShowField label={'Tag'}>
                        <Badge color={'sky'}>{faq.tag.description}</Badge>
                    </ShowField>
                    <ShowField label={'Pergunta'}>
                        {faq.question}
                    </ShowField>
                    <ShowField label={'Resposta'}>
                        <span dangerouslySetInnerHTML={{ __html: faq.answer }}></span>
                    </ShowField>
                    <ShowField label={'Criado em'}>
                        {faq.created_at}
                    </ShowField>
                    <ShowField label={'Atualizado em'}>
                        {faq.updated_at}
                    </ShowField>
                </Panel>
                <Panel className={'flex flex-wrap items-center justify-center gap-1 md:gap-4'}>
                    <Button href={route('faqs.index')} className={'gap-2'}>
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    {can.update && <Button href={route('faqs.edit', faq.id)} className={'gap-2'} color={'yellow'}>
                        <Pencil size={20} />
                        <span>Editar</span>
                    </Button>}
                    {can.delete && <DeleteModal url={route('faqs.destroy', faq.id)} />}
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Show;

