import React from 'react';
import './card.css';
import { Link } from "react-router-dom";

export default function CardAproveitamento(req) {
  const { 
    id,  dataRequisicao,usuario,disciplinaSolicitada, deferido,
    disciplinasCursadasAnterior, parecer,
  } = req.requisicao;
  return (
    <div className="card"  > 
    <Link to={`/parecer/${id}`} class={`badge badge-${mudaCor(deferido)}`}>{`Status do processo : ${deferido}`}</Link>
      <p>{`ID: ${id}`}</p>
      <p>{`Data: ${dataRequisicao}`}</p>
      <p>{`Solicitante: ${usuario && usuario.nome}`}</p>
      <p>{`Parecer: ${parecer}`}</p>
      <p>{`Disciplina solicitada: ${disciplinaSolicitada.nome}`}</p>
      <p>{`Disciplina cursada anteriormente: ${disciplinasCursadasAnterior}`}</p>
    </div>
  );

  
}

const mudaCor = (deferido) => {
   switch(deferido){
      case 'DEFERIDO' :
        return "success";
        case 'INDEFERIDO':
          return "danger"
          case "AGUARDANDO DOCUMENTOS" :
            return "info"
        default :
         return "warning"
   }
}