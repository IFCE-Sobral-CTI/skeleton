import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";
import { encode } from "html-entities";

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        question: "",
        answer: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData('answer', encode(data.answer));
        post(route('faqs.store'), {data});
    };

    return (
        <>
            <Head title="Novo FAQ" />
            <AuthenticatedLayout titleChildren={'Cadastro de novo FAQ'} breadcrumbs={[{ label: 'FAQ', url: route('faqs.index') }, { label: 'Novo', url: route('faqs.create') }]}>
                <Panel>
                    <Form data={data} errors={errors} processing={processing} onHandleChange={onHandleChange} handleSubmit={handleSubmit} />
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Create;

