import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Form/Button';
import Input from '@/Components/Form/Input';
import { ArrowLeft, Send } from "lucide-react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Esqueceu a senha" />

            <div className="mb-4 text-sm leading-normal text-gray-500">
                Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de e-mail e enviaremos uma senha por e-mail
                link de redefinição que permitirá que você escolha um novo.
            </div>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="block w-full mt-1"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-0" />

                <div className="flex items-center justify-end mt-4">
                    <Button href={route('admin')} className={'gap-2'}>
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    <Button type='submit' className="gap-2 ml-4" processing={processing} color="green" >
                        <Send size={20} />
                        Enviar
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
