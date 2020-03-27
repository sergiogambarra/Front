import React from 'react';
import './card.css';
import { Link } from "react-router-dom";

export default function CardCertificacao(req) {
  const { 
    id,  dataRequisicao,usuario,/*  curso, */ disciplinaSolicitada, deferido,
    formacaoAtividadeAnterior, parecer,
  } = req.requisicao;

  return (
    <div className="card">
       <Link to="/parecer" class="badge badge-warning">Processo ainda não está finalizado</Link>
      <p>{`ID: ${id}`}</p>
      <p>{`Data: ${dataRequisicao}`}</p>
      <p>{`Aluno: ${usuario}`}</p>
      <p>{`Deferido: ${deferido}`}</p>
      <p>{`Parecer: ${parecer}`}</p>
      {/* <p>{`Curso: ${curso.nome}`}</p> */}
      <p>{`Disciplina solicitada: ${disciplinaSolicitada.nome}`}</p>
      <p>{`Formação/Atividade realizada anteriormente: ${formacaoAtividadeAnterior}`}</p>
    </div>
  );
}