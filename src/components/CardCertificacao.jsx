import React from 'react';
import './card.css';

export default function CardCertificacao(req) {
  const { 
    id, tipo, dataRequisicao,/*  curso, */ disciplinaSolicitada, deferido,
    formacaoAtividadeAnterior, parecer,
  } = req.requisicao;

  return (
    <div className="card">
      <p>{`ID: ${id}`}</p>
      <p>{`Data: ${dataRequisicao}`}</p>
      <p>{`Deferido: ${deferido}`}</p>
      <p>{`Parecer: ${parecer}`}</p>
      {/* <p>{`Curso: ${curso.nome}`}</p> */}
      <p>{`Disciplina solicitada: ${disciplinaSolicitada.nome}`}</p>
      <p>{`Tipo: ${tipo}`}</p>
      <p>{`Formação/Atividade realizada anteriormente: ${formacaoAtividadeAnterior}`}</p>
    </div>
  );
}