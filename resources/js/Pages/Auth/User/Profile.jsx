import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Panel from "@/Components/Dashboard/Panel";
import ShowField from "@/Components/Dashboard/ShowField";
import Button from "@/Components/Form/Button";
import Badge from "@/Components/Dashboard/Badge";
import { ArrowLeft } from "lucide-react";

function Profile({ user }) {
    return (
        <>
            <Head title="Meu Perfil" />
            <AuthenticatedLayout
                titleChildren="Meu Perfil"
                breadcrumbs={[
                    { label: user.name, url: route('profile') },
                    { label: 'Perfil' },
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
                        <div className="sm:col-span-2">
                            <p className="text-sm font-semibold text-neutral-600">
                                Para alterar a senha, acesse o{' '}
                                <a
                                    href="https://suap.ifce.edu.br/comum/solicitar_trocar_senha/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-neutral-900"
                                >
                                    SUAP
                                </a>.
                            </p>
                        </div>
                    </div>
                </Panel>

                <Panel className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <Button href={route('admin')} className="gap-2">
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}

export default Profile;
