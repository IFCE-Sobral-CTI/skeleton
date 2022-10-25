import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import Panel from "@/Components/Dashboard/Panel";
import Input from "@/Components/Form/Input";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import Select from "@/Components/Form/Select";
import Form from "./Components/Form";

function Edit({ rule, groups }) {
    const { data, setData, put, processing, errors } = useForm({
        description: rule.description,
        control: rule.control,
        group_id: rule.group_id,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('rules.update', rule.id), {data});
    };

    return (
        <>
            <Head title="Editar Usuário" />
            <AuthenticatedLayout titleChildren={'Editar Usuário'} breadcrumbs={[{ label: 'Usuários', url: route('rules.index') }, { label: rule.name, url: route('rules.show', rule.id) }, { label: 'Editar'}]}>
                <Panel>
                    <Form data={data} groups={groups} errors={errors} processing={processing} onHandleChange={onHandleChange} handleSubmit={handleSubmit} />
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Edit;

