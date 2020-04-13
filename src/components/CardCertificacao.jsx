import React from 'react';
import './card.css';
import { Link } from "react-router-dom";

export default function CardCertificacao(req) {
  const {
    id, dataRequisicao, usuario, disciplinaSolicitada, deferido,
    formacaoAtividadeAnterior, parecer,
  } = req.requisicao;

  return (
    <div className="card">
      <Link to={`/parecer/${id}`} class={`badge badge-${mudaCor(deferido)}`}>{`Status do processo : ${deferido}`}</Link>
      <p>{`ID: ${id}`}</p>
      <p>{`Data: ${dataRequisicao}`}</p>
      <p>{`Aluno: ${usuario && usuario.perfil.nome}`}</p>
      <p>{`Parecer: ${parecer}`}</p>
      <p>{`Disciplina solicitada: ${disciplinaSolicitada.nome}`}</p>
      <p>{`Formação/Atividade realizada anteriormente: ${formacaoAtividadeAnterior}`}</p>
    </div>
  );
}
const mudaCor = (deferido) => {
  switch (deferido) {
    case 'DEFERIDO':
      return "success";
    case 'INDEFERIDO':
      return "danger"
    default:
      return "warning"
  }
}