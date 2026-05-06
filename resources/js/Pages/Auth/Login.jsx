import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/Form/Button';
import Input from '@/Components/Form/Input';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        registry: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Autenticação" />

            <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--neutral-900)', marginBottom: 4 }}>Entrar no sistema</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>Use sua matrícula institucional</p>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="registry" value="Matrícula" />
                    <Input
                        type="text"
                        name="registry"
                        value={data.registry}
                        className="block w-full mt-1"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                        placeholder="Matrícula"
                    />
                    <InputError message={errors.registry} className="mt-0" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Senha" />
                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                        placeholder="Senha"
                    />
                    <InputError message={errors.password} className="mt-0" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end gap-4 mt-4">
                    <a
                        href="https://suap.ifce.edu.br/comum/solicitar_trocar_senha/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Esqueceu a senha?
                    </a>
                    <Button type='submit' color={'green'} processing={processing}>Entrar</Button>
                </div>
            </form>
        </GuestLayout>
    );
}
