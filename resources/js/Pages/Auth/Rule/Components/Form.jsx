import React from "react";
import Input from "@/Components/Form/Input";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import Select from "@/Components/Form/Select";
import { ArrowLeft, Send } from "lucide-react";

export default function Form({data, errors, handleSubmit, onHandleChange, groups, processing }){
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-4">
                <label htmlFor="description" className="font-light">Descrição</label>
                <Input value={data.description} name={'description'} handleChange={onHandleChange} required={true} placeholder="Digite a descrição da regra" />
                <InputError message={errors.description} />
            </div>
            <div className="mb-4">
                <label htmlFor="group" className="font-light">Grupo de páginas</label>
                <Select value={data.group_id} name={'group_id'} handleChange={onHandleChange} required={true}>
                    <option>Selecione uma página</option>
                    {groups.map(item => (
                        <option value={item.id} key={item.id}>{item.description}</option>
                    ))}
                </Select>
                <InputError message={errors.group_id} />
            </div>
            <div className="mb-4">
                <label htmlFor="control" className="font-light">Controle</label>
                <Input value={data.control} name={'control'} handleChange={onHandleChange} required={true} placeholder="Digite um controle para a regra" />
                <InputError message={errors.control} />
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
                <Button type={'submit'} processing={processing} color={'green'} className={"gap-2"}>
                    <Send size={20} />
                    <span>Enviar</span>
                </Button>
                <Button href={route('rules.index')} className={'gap-2'}>
                    <ArrowLeft size={20} />
                    <span>Voltar</span>
                </Button>
            </div>
        </form>
    )
}
