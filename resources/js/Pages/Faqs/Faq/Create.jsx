import React, { useCallback } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";

function Create({ tags }) {
    const { data, setData, post, processing, errors } = useForm({
        question: "",
        answer: "",
        tag_id: "",
    });

    const onHandleChange = useCallback((event) => {
        setData(event.target.name, event.target.value);
    }, [setData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        post(route('faqs.store'));
    }, [post]);

    return (
        <>
            <Head title="Novo FAQ" />
            <AuthenticatedLayout
                titleChildren="Cadastro de novo FAQ"
                breadcrumbs={[
                    { label: 'FAQ', url: route('faqs.index') },
                    { label: 'Novo', url: route('faqs.create') },
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

export default Create;
