import React, {Component, useState, useEffect} from 'react';
import DisciplinaForm from './DisciplinaForm'
import API from '../base';
import DisciplinaTabela from "./DisciplinaTabela";

export default function DisciplinaView() {
    const [carregar, setCarregar] = useState(true); 
    const [disciplinas, setDisciplinas] = useState([]); 
    const [carregardisciplinas, setCarregardisciplinas] = useState(true);

    useEffect(() => listarCursos());

    const listarCursos = () => {
        API.get("/cursos").then((retorno)=>this.setState({carregar:false,cursos:retorno.data})  );
    }

    const listarDisciplinas = () => {
        API.get("/cursos").then((retorno)=>this.setState({carregardisciplinas:false,disciplinas:retorno.data})  );
    }

    const cadastrar = (disciplina) => {
        API.post(`/cursos/${disciplina.curso.id}/disciplinas`, disciplina).then();
    }

    return (
        <div>
            {
                carregar
                ? null : (
                    <DisciplinaForm 
                        disciplinas={disciplinas}
                        onCadastrar={(nome)=> cadastrar(nome)}
                    />
                )
            }
            {
                carregardisciplinas 
                ? null : <DisciplinaTabela itens={disciplinas} />
            }
        </div>
    );
} 

