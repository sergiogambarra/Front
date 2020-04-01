import React, { useState, useEffect } from 'react';
import SACESelect from './SACESelect';
import { getDisciplinas } from '../../services/DisciplinaService';

const defaultSelect = {label: 'Selecione a disciplina que deseja aproveitar', value: ''};

export default function DisciplinaSolicitadaSelect({ curso, disabled, onChange, onError, value }) {
    const [disciplinas, setDisciplinas] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await getDisciplinas(curso);
            setDisciplinas(result);
        }
        onChange('');
        setDisciplinas([]);
        
        curso && fetchData();
    }, [curso, onChange]);
    
    return (
        <SACESelect 
        label={'Disciplina solicitada'}
        onChange={(option) => onChange(option)}
        selectedOption={null}
        options={disciplinas}
        value={value || defaultSelect}
        isDisabled={disabled}
        onError={onError}
        onErrorMessage={'O campo disciplina solicitada é obrigatório.'}
        />
        );
    }