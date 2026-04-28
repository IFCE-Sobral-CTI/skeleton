import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Panel from "@/Components/Dashboard/Panel";
import ShowField from "@/Components/Dashboard/ShowField";
import Button from "@/Components/Form/Button";
import DeleteModal from "@/Components/Dashboard/DeleteModal";
import Description from "./Components/Description";
import Properties from "./Components/Properties";
import { ArrowLeft } from "lucide-react";

function Show({ activity, can }) {
    return (
        <>
            <Head title="Detalhes do Log" />
            <AuthenticatedLayout
                titleChildren="Detalhes do Log"
                breadcrumbs={[
                    { label: 'Logs', url: route('activities.index') },
                    { label: activity.description, url: route('activities.show', activity.id) },
                ]}
            >
                <Panel className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ShowField label="Ação">
                            <Description title={activity.description} />
                        </ShowField>
                        <ShowField label="Módulo">
                            {activity.subject_type.split('\\').pop()}
                        </ShowField>
                        <ShowField label="Usuário">
                            {activity.causer?.name ?? '—'}
                        </ShowField>
                        <ShowField label="Criado em">{activity.created_at}</ShowField>
                        <ShowField label="Atualizado em">{activity.updated_at}</ShowField>
                        <div className="sm:col-span-2">
                            <ShowField label="Propriedades">
                                <Properties properties={activity.properties} />
                            </ShowField>
                        </div>
                    </div>
                </Panel>

                <Panel className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <Button href={route('activities.index')} className="gap-2">
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Button>
                    {can.delete && <DeleteModal url={route('activities.destroy', activity.id)} />}
                </Panel>
            </AuthenticatedLayout>
        </>
    );
}

export default Show;
