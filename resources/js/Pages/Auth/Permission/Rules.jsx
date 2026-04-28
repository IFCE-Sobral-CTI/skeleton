import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import { ArrowLeft, Send } from "lucide-react";

function Rules({ permission, groups }) {
    const { data, setData, put, processing, errors } = useForm({
        rules: permission.rules.map(item => item.id),
    });

    const onHandleChange = (event) => {
        const value = parseInt(event.target.value);
        let [...list] = data.rules;

        if (data.rules.includes(value)) {
            list.splice(list.indexOf(value), 1);
            setData('rules', [...list]);
        }
        else {
            list.push(value);
            setData('rules', list);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('permissions.rules.sync', permission.id), {data});
    };

    const items = groups.map((group, i) => {
        return (
            <div className="p-2 border rounded-lg" key={'g' + i}>
                <p className="mb-2 font-semibold">{group.description}</p>
                {group.rules.map((rule, j) => {
                    return (
                        <div className="mb-2" key={'r' + j}>
                            <div className="flex gap-2">
                                <input type="checkbox" value={rule.id} id={rule.id} onChange={onHandleChange} defaultChecked={data.rules.includes(rule.id)} className="w-5 h-5 bg-gray-100 border rounded-md text-green focus:ring-green-light" />
                                <label className="text-sm" htmlFor={rule.id}>{rule.description}</label>
                                <InputError message={errors.rules} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    })

    return (
        <>
            <Head title="Regas" />
            <AuthenticatedLayout titleChildren={'Adicionar regras a permissão'} breadcrumbs={[{ label: 'Permissões', url: route('permissions.index') }, { label: permission.description, url: route('permissions.show', permission.id) }, { label: 'Regras'}]}>
                <Panel>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="grid grid-cols-3 gap-4">
                            {items}
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <Button type={'submit'} processing={processing} color={'green'} className={"gap-2"}>
                                <Send size={20} />
                                <span>Enviar</span>
                            </Button>
                            <Button href={route('permissions.show', permission.id)} className={'gap-2'}>
                                <ArrowLeft size={20} />
                                <span>Voltar</span>
                            </Button>
                        </div>
                    </form>
                </Panel>
            </AuthenticatedLayout>
        </>
    )
}

export default Rules;

