import React, { useCallback } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Form from "./Components/Form";

export default function Send({ users, permissions, prefill = null }) {
    const { data, setData, post, processing, errors } = useForm({
        target:        'all',
        permission_id: '',
        user_ids:      [],
        title:         prefill?.title   ?? '',
        message:       prefill?.message ?? '',
        type:          prefill?.type    ?? 'info',
        url:           prefill?.url     ?? '',
        send_email:    false,
    });

    const onHandleChange = useCallback(e => {
        setData(e.target.name, e.target.value);
    }, [setData]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        post(route('notifications.store'));
    }, [post]);

    return (
        <>
            <Head title="Enviar Notificação" />
            <AuthenticatedLayout
                titleChildren="Enviar Notificação"
                breadcrumbs={[
                    { label: 'Notificações', url: route('notifications.index') },
                    { label: 'Enviar' },
                ]}
            >
                <Panel>
                    <Form
                        data={data}
                        errors={errors}
                        processing={processing}
                        handleSubmit={handleSubmit}
                        onHandleChange={onHandleChange}
                        setData={setData}
                        users={users}
                        permissions={permissions}
                    />
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}
