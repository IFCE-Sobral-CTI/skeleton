import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Input from '@/Components/Form/Input';
import Button from '@/Components/Form/Button';
import { ArrowLeft } from "lucide-react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="E-mail" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-0" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Senha" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-0" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="Confirmação Senha" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password_confirmation} className="mt-0" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button href={route('admin')} className={'gap-2'}>
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    <Button type="submit" className="ml-4" processing={processing} color="green">
                        Redefinir senha
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
