import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";

function Create({ groups }) {
    const { data, setData, post, processing, errors } = useForm({
        description: "",
        control: "",
        group_id: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rules.store'), {data});
    };

    return (
        <>
            <Head title="Nova Regra" />
            <AuthenticatedLayout titleChildren={'Cadastro de Nova Regra'} breadcrumbs={[{ label: 'Regras', url: route('rules.index') }, { label: 'Nova', url: route('rules.create') }]}>
                <Panel>
                    <Form data={data} groups={groups} errors={errors} processing={processing} onHandleChange={onHandleChange} handleSubmit={handleSubmit} />
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Create;

