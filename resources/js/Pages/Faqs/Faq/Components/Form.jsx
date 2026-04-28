import React from "react";
import Input from "@/Components/Form/Input";
import InputError from "@/Components/InputError";
import Button from "@/Components/Form/Button";
import Editor from "./Editor";
import SelectOnly from "@/Components/Form/SelectOnly";
import { ArrowLeft, Send } from "lucide-react";

export default function Form({data, errors, handleSubmit, onHandleChange, processing, tags }) {
    console.log(data);
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <SelectOnly
                value={data.tag_id}
                data={tags}
                onChange={onHandleChange}
                error={errors.tag_id}
                label={'Tag'}
                name={'tag_id'}
                required
            />
            <div className="mb-4">
                <label htmlFor="question" className="font-light">Pergunta</label>
                <Input value={data.question} name={'question'} handleChange={onHandleChange} required={true} placeholder="Digite a descrição da página" />
                <InputError message={errors.question} />
            </div>
            <div className="mb-4">
                <label htmlFor="answer" className="font-light">Resposta</label>
                <Editor
                    name={'answer'}
                    handleChange={onHandleChange}
                    value={data.answer}
                />
                <InputError message={errors.answer} />
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

