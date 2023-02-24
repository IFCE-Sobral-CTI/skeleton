import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";

function Edit({ permission }) {
    const { data, setData, put, processing, errors } = useForm({
        description: permission.description,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('permissions.update', permission.id), {data});
    };

    return (
        <>
            <Head title="Editar Permissão" />
            <AuthenticatedLayout titleChildren={'Editar Permissão'} breadcrumbs={[{ label: 'Permissões', url: route('permissions.index') }, { label: permission.name, url: route('permissions.show', permission.id) }, { label: 'Editar'}]}>
                <Panel>
                    <Form data={data} errors={errors} processing={processing} onHandleChange={onHandleChange} handleSubmit={handleSubmit} />
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Edit;

