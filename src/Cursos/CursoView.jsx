import React, { useState, useEffect} from 'react';
import { Form, Button, } from 'react-bootstrap';
import SACEInput from '../components/inputs/SACEInput';
import CursoForm from './CursoForm'
import API from '../base';
import CursoTabela from "./CursoTabela";
import DisciplinaTabela from "../Disciplinas/DisciplinaTabela";
import { 
  getCursos,
  postCurso,
  putCurso,
  deleteCurso,
} from "../services/CursoService";

export default function CursoView() {
  const [carregar, setCarregar] = useState(true);
  const [carregarDisciplinas, setCarregarDisciplinas] = useState(true);
  const [disciplinas, setDisciplinas] = useState(true);
  const [cursoParaEditar, setCursoParaEditar] = useState(null); 
  const [cursos, setCursos] = useState([]);

  useEffect(() => listarCursos(), []);

  const listarCursos = () =>
    getCursos()
    .then((retorno)=> {
      setCarregar(false);  
      setCursos(retorno);
      setCursoParaEditar(null);
    });

  const cadastrar = (nome) => 
    postCurso(nome)
    .then(() => listarCursos())
    .catch(error => console.log('CursoView::cadastrar::error', error));

  const atualizar = () => 
    putCurso(cursoParaEditar.id, cursoParaEditar)
    .then(() => listarCursos())
    .catch(error => console.error('CursoView::atualizar::', error));

  const apagar = (curso) => 
    deleteCurso(curso.id)
    .then(() => listarCursos())
    .catch(error => console.log('CursoView::apagar::', error));

  const listarDisciplinas = (curso) =>
    API.get(`/cursos/${curso.id}/disciplinas`)
    .then((retorno) => {
      setCarregarDisciplinas(false);
      setDisciplinas(retorno.data);
    });

  const editar = (curso) => {
    setCursoParaEditar(curso);
    listarDisciplinas(curso);
  }

  const cancelar = () => setCursoParaEditar(null);

  const handleChangeCurso = (value) =>
    setCursoParaEditar({
      id: cursoParaEditar.id + 0,
      nome: value,
    });

  return(
    <div>
      {
        cursoParaEditar == null 
        ? 
          <CursoForm onCadastrar={(nome) => cadastrar(nome)}/>
        : 
          <div>
            <SACEInput
                label={'Nome do Curso'}
                placeholder={'Preencha com o nome do curso que você deseja cadastrar'}
                value={cursoParaEditar.nome}
                onChange={({ target }) => handleChangeCurso(target.value)}
            />

            <Form.Group className="d-flex justify-content-end">
                <Button 
                  variant="link" 
                  className="btn btn-link m-1" 
                  onClick={() => cancelar()}
                >
                  {"Cancelar"}
                </Button>
                
                <Button 
                  variant="primary" 
                  className="btn btn-primary m-1" 
                  onClick={() => atualizar()}
                >
                  {"Atualizar"}
                </Button>
            </Form.Group>
          </div>
      }
      <br />
      {
        carregar ? 
          null 
        : 
          <CursoTabela 
            cursos={cursos} 
            editar={(curso) => editar(curso)}
            apagar={(curso) => apagar(curso)}
          />
      }
      <br />
      { carregarDisciplinas ? null : <DisciplinaTabela disciplinas={disciplinas} /> }
    </div>
  );
}
