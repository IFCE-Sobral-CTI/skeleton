import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";

function Edit({ tag }) {
    const { data, setData, put, processing, errors } = useForm({
        description: tag.description,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tags.update', tag.id), {data});
    };

    return (
        <>
            <Head title="Editar Tag" />
            <AuthenticatedLayout
                titleChildren={'Editar Tag'}
                breadcrumbs={[
                    { label: 'Tags', url: route('tags.index') },
                    { label: tag.description, url: route('tags.show', tag.id) },
                    { label: 'Editar'}
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

export default Edit;

