import React, { useCallback, useMemo } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import Input from "@/Components/Form/Input";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import SelectOnly from "@/Components/Form/SelectOnly";
import { ArrowLeft, Send } from "lucide-react";

const STATUS_OPTIONS = [
    { id: '1', name: 'Ativo' },
    { id: '0', name: 'Inativo' },
];

function Create({ permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        status: '',
        registry: "",
        permission_id: "",
    });

    const onHandleChange = useCallback((event) => {
        setData(event.target.name, event.target.value);
    }, [setData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        post(route('users.store'));
    }, [post]);

    const permissionOptions = useMemo(() =>
        permissions.map(item => ({ id: item.id, name: item.description })),
        [permissions],
    );

    return (
        <>
            <Head title="Novo Usuário" />
            <AuthenticatedLayout
                titleChildren="Cadastro de Novo Usuário"
                breadcrumbs={[
                    { label: 'Usuários', url: route('users.index') },
                    { label: 'Novo', url: route('users.create') },
                ]}
            >
                <Panel>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <SelectOnly
                                data={STATUS_OPTIONS}
                                onChange={onHandleChange}
                                error={errors.status}
                                value={data.status}
                                label="Status"
                                name="status"
                            />
                            <SelectOnly
                                data={permissionOptions}
                                onChange={onHandleChange}
                                error={errors.permission_id}
                                value={data.permission_id}
                                label="Permissão de acesso"
                                name="permission_id"
                            />
                            <div className="mb-4 md:col-span-2">
                                <label htmlFor="name" className="font-light">Nome</label>
                                <Input value={data.name} name="name" handleChange={onHandleChange} required placeholder="Digite o nome completo" />
                                <InputError message={errors.name} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="font-light">E-mail</label>
                                <Input type="email" value={data.email} name="email" handleChange={onHandleChange} required placeholder="Digite um e-mail válido" />
                                <InputError message={errors.email} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="registry" className="font-light">Matrícula</label>
                                <Input type="number" value={data.registry} name="registry" handleChange={onHandleChange} required placeholder="Digite a matrícula" />
                                <InputError message={errors.registry} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="font-light">Senha</label>
                                <Input type="password" value={data.password} name="password" handleChange={onHandleChange} required placeholder="Digite a senha" />
                                <InputError message={errors.password} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password_confirmation" className="font-light">Confirmação de senha</label>
                                <Input type="password" value={data.password_confirmation} name="password_confirmation" handleChange={onHandleChange} required placeholder="Repita a senha" />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                            <Button type="submit" processing={processing} color="green" className="gap-2">
                                <Send size={20} />
                                <span>Enviar</span>
                            </Button>
                            <Button href={route('users.index')} className="gap-2">
                                <ArrowLeft size={20} />
                                <span>Voltar</span>
                            </Button>
                        </div>
                    </form>
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}

export default Create;
