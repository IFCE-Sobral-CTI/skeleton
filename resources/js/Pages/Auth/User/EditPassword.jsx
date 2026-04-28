import React, { useCallback } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Panel from "@/Components/Dashboard/Panel";
import Input from "@/Components/Form/Input";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import { ArrowLeft, Send } from "lucide-react";

function EditPassword({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        password: "",
        password_confirmation: "",
    });

    const onHandleChange = useCallback((event) => {
        setData(event.target.name, event.target.value);
    }, [setData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        put(route('users.update.password', user.id));
    }, [put, user.id]);

    return (
        <>
            <Head title="Mudar Senha" />
            <AuthenticatedLayout
                titleChildren="Mudar senha do Usuário"
                breadcrumbs={[
                    { label: 'Usuários', url: route('users.index') },
                    { label: user.name, url: route('users.show', user.id) },
                    { label: 'Alterar Senha' },
                ]}
            >
                <Panel>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
                            <Button href={route('users.show', user.id)} className="gap-2">
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

export default EditPassword;
