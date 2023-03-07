import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";

function Edit({ faq }) {
    const { data, setData, put, processing, errors } = useForm({
        question: faq.question,
        answer: faq.answer,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('faqs.update', faq.id), {data});
    };

    return (
        <>
            <Head title="Editar FAQ" />
            <AuthenticatedLayout titleChildren={'Editar FAQ'} breadcrumbs={[{ label: 'FAQs', url: route('faqs.index') }, { label: faq.description, url: route('faqs.show', faq.id) }, { label: 'Editar'}]}>
                <Panel>
                    <Form data={data} errors={errors} processing={processing} onHandleChange={onHandleChange} handleSubmit={handleSubmit} />
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Edit;

