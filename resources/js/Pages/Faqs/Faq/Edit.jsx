import React, { useCallback } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";

function Edit({ faq, tags }) {
    const { data, setData, put, processing, errors } = useForm({
        question: faq.question,
        answer: faq.answer ?? '',
        tag_id: faq.tag_id,
    });

    const onHandleChange = useCallback((event) => {
        setData(event.target.name, event.target.value);
    }, [setData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        put(route('faqs.update', faq.id));
    }, [put, faq.id]);

    return (
        <>
            <Head title="Editar FAQ" />
            <AuthenticatedLayout
                titleChildren="Editar FAQ"
                breadcrumbs={[
                    { label: 'FAQ', url: route('faqs.index') },
                    { label: faq.question, url: route('faqs.show', faq.id) },
                    { label: 'Editar' },
                ]}
            >
                <Panel>
                    <Form
                        data={data}
                        errors={errors}
                        processing={processing}
                        onHandleChange={onHandleChange}
                        handleSubmit={handleSubmit}
                        tags={tags}
                    />
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}

export default Edit;
