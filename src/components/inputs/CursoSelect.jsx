import React, { useState, useEffect } from 'react';
import SACESelect from './SACESelect';
import { getCursos } from '../../services/CursoService';

const defaultSelect = {label: 'Selecione o seu curso', value: ''};

export default function CursoSelect({ onChange, onError, value }) {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCursos();
            setCursos(result);
        }
                
        fetchData();
    }, []);

    return (
        <SACESelect 
            label={'Curso'}
            value={value || defaultSelect}
            selectedOption={null}
            options={cursos}
            onChange={onChange}
            onError={onError}
            onErrorMessage={'O campo curso é obrigatório.'}
        />
    );
}