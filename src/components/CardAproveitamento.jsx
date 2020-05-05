import React from 'react';
import './card.css';
import {useHistory} from 'react-router-dom'
import Col from 'react-bootstrap/Col'


export default function  CardAproveitamento ({requisicao}){
  console.log(requisicao);
  
  let history = useHistory();
  const {
    id, dataRequisicao, usuario, disciplinaSolicitada, deferido,
     parecer,professor
  } = requisicao;
     return (
      <Col className="box-card" sm={4}>
        <div className='requisicao' onClick={()=>history.push(`/parecer/${id}`)}>
        <p class={`badge badge-${mudaCor(deferido)}`}>{`Status do processo : ${deferido}`}</p>
        <p>{`ID: ${id}`}</p>
        <p>{`Data: ${dataRequisicao}`}</p>
        <p>{`Aluno: ${usuario && usuario.perfil.nome}`}</p>
        <p>{`Parecer Servidor: ${parecer===null?"":parecer}`}</p>
        <p>{`Parecer Coodenador: ${parecer===null?"":parecer}`}</p>
        <p>{`Parecer Professor: ${parecer===null?"":parecer}`}</p>
        <p>{`Disciplina : ${disciplinaSolicitada&&disciplinaSolicitada.nome}`}</p>
        <p>{`Professor : ${professor===null?"":professor&&professor.perfil.nome}`}</p>
        </div>
      </Col>
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