import Badge from "@/Components/Dashboard/Badge";

const ACTION_MAP = {
    created: { color: 'green',  label: 'Criou um registro' },
    updated: { color: 'yellow', label: 'Atualizou um registro' },
    deleted: { color: 'red',    label: 'Apagou um registro' },
};

export default function Description({ title }) {
    const action = ACTION_MAP[title] ?? { color: 'gray', label: 'Informar' };
    return <Badge className={'sm:px-2 sm:py-1'} color={action.color}>{action.label}</Badge>;
}
