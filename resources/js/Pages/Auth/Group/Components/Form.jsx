import React from "react";
import Input from "@/Components/Form/Input";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import { ArrowLeft, Send } from "lucide-react";

export default function Form({data, errors, handleSubmit, onHandleChange, processing }) {
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-4">
                <label htmlFor="description" className="font-light">Descrição</label>
                <Input value={data.description} name={'description'} handleChange={onHandleChange} required={true} placeholder="Digite a descrição da página" />
                <InputError message={errors.description} />
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
                <Button type={'submit'} processing={processing} color={'green'} className={"gap-2"}>
                    <Send size={20} />
                    <span>Enviar</span>
                </Button>
                <Button href={route('groups.index')} className={'gap-2'}>
                    <ArrowLeft size={20} />
                    <span>Voltar</span>
                </Button>
            </div>
        </form>
    )
}

