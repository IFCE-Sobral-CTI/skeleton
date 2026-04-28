import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Panel from "@/Components/Dashboard/Panel";
import ShowField from "@/Components/Dashboard/ShowField";
import Button from "@/Components/Form/Button";
import DeleteModal from "@/Components/Dashboard/DeleteModal";
import VerifyModal from "@/Components/Dashboard/VerifyModal";
import Badge from "@/Components/Dashboard/Badge";
import { ArrowLeft, KeyRound, Pencil, ShieldCheck } from "lucide-react";

function Show({ user, can }) {
    return (
        <>
            <Head title="Detalhes do usuário" />
            <AuthenticatedLayout
                titleChildren="Detalhes do Usuário"
                breadcrumbs={[
                    { label: 'Usuários', url: route('users.index') },
                    { label: user.name, url: route('users.show', user.id) },
                ]}
            >
                <Panel className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <ShowField label="Status">
                                {user.status == '1'
                                    ? <Badge color="green">Ativo</Badge>
                                    : <Badge color="red">Inativo</Badge>}
                            </ShowField>
                        </div>
                        <ShowField label="Permissão de acesso">{user.permission.description}</ShowField>
                        <ShowField label="Matrícula">{user.registry}</ShowField>
                        <ShowField label="Nome">{user.name}</ShowField>
                        <ShowField label="E-mail">{user.email}</ShowField>
                        <ShowField label="Validado em">{user.email_verified_at}</ShowField>
                        <ShowField label="Criado em">{user.created_at}</ShowField>
                        <ShowField label="Atualizado em">{user.updated_at}</ShowField>
                    </div>
                </Panel>

                <Panel className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <Button href={route('users.index')} className="gap-2">
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    {can.update && (
                        <Button href={route('users.edit', user.id)} className="gap-2" color="yellow">
                            <Pencil size={20} />
                            <span>Editar</span>
                        </Button>
                    )}
                    {can.update_password && (
                        <Button href={route('users.edit.password', user.id)} className="gap-2" color="violet">
                            <KeyRound size={20} />
                            <span>Alterar Senha</span>
                        </Button>
                    )}
                    {can.verify && !user.email_verified_at && (
                        <VerifyModal url={route('users.verify', user.id)} />
                    )}
                    {can.delete && <DeleteModal url={route('users.destroy', user.id)} />}
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}

export default Show;
