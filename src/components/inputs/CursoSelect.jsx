import React, { useState, useEffect } from 'react';
import SACESelect from './SACESelect';
import { get } from '../../services/ServicoCrud';

const defaultSelect = {label: 'Selecione o seu curso', value: ''};

export default function CursoSelect({ onChange, onError, value }) {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await get("cursos/");
            setCursos(result);        
        } 
        fetchData();
    }, []);

    return (
        <SACESelect 
            label={'Curso'}
            value={value || defaultSelect}
            selectedOption={null}
            options={ cursos }
            onChange={onChange}
            onError={onError}
            onErrorMessage={'O campo curso é obrigatório.'}
        />
    );
}