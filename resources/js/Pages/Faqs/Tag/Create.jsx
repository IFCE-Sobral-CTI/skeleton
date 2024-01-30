import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";

function Create() {
    const { data, setData, post, processing, errors } = useForm({
        description: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tags.store'), {data});
    };

    return (
        <>
            <Head title="Novo FAQ" />
            <AuthenticatedLayout
                titleChildren={'Cadastro de nova Tag'}
                breadcrumbs={[
                    { label: 'Tags', url: route('tags.index') },
                    { label: 'Nova', url: route('tags.create') }
                ]}
            >
                <Panel>
                    <Form
                        data={data}
                        errors={errors}
                        processing={processing}
                        onHandleChange={onHandleChange}
                        handleSubmit={handleSubmit}
                    />
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Create;

