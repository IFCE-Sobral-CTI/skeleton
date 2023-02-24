import React from 'react';
import 'tw-elements';
import Panel from '@/Components/Dashboard/Panel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({breadcrumbs, children}) {
    return (
        <>
            <AuthenticatedLayout breadcrumbs={[{label: 'Minha Página', url: route('admin')}]}>
                <Panel>Página inicial</Panel>
            </AuthenticatedLayout>
        </>
    )
}
