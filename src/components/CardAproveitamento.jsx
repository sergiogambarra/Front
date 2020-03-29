import React from 'react';
import './card.css';
import { Link } from "react-router-dom";

export default function CardAproveitamento({req}) {
  const { 
    id,  dataRequisicao,usuario,disciplinaSolicitada, deferido,
    disciplinasCursadasAnterior, parecer,
  } = req.requisicao;
  return (
    <div className="card"  > 
    <Link to={`/parecer/${id}`} class="badge badge-warning">Processo ainda não está finalizado</Link>
      <p>{`ID: ${id}`}</p>
      <p>{`Data: ${dataRequisicao}`}</p>
      <p>{`Aluno: ${usuario}`}</p>
      <p>{`Deferido: ${deferido}`}</p>
      <p>{`Parecer: ${parecer}`}</p>
      <p>{`Disciplina solicitada: ${disciplinaSolicitada.nome}`}</p>
      <p>{`Disciplina cursada anteriormente: ${disciplinasCursadasAnterior}`}</p>
    </div>
  );
}