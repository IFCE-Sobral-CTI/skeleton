import Badge from "@/Components/Dashboard/Badge";
import React, { useState, useEffect } from "react";

export default function Description({ title }) {
    const [result, setResult] = useState('');

    useEffect(() => {
        switch(title) {
            case 'created':
                setResult(<Badge color={'green'}>Criou um registro</Badge>);
                break;
            case 'updated':
                setResult(<Badge color={'yellow'}>Atualizou um registro</Badge>);
                break;
            case 'deleted':
                setResult(<Badge color={'red'}>Apagou um registro</Badge>);
                break;
            default:
                setResult(<Badge color={'cyan'}>Informe</Badge>);
                break;
        }
    }, []);

    return result;
}
