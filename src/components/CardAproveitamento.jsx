import React from 'react';
import './card.css';
import {useHistory} from 'react-router-dom'
import Col from 'react-bootstrap/Col'


export default function  CardAproveitamento ({requisicao}){
  let history = useHistory();
  const {
    id, dataRequisicao, usuario, disciplinaSolicitada, deferido,tipo,
    professor  } = requisicao;
    console.log(requisicao);
    

     return (
      <Col className="box-card" sm={4}>
        <div className='requisicao' onClick={()=>history.push(`/parecer/${id}`)}>
        <p className={`badge badge-${mudaCor(deferido)}`}>{`Status do processo : ${deferido}`}</p>
        <p>{`ID: ${id}`}</p>
        <p>{`${tipo === "aproveitamento"? "APROVEITAMENTO DE ESTUDOS":""}`}</p>
        <p>{`Data: ${dataRequisicao}`}</p>
        <p>{`Aluno: ${usuario && usuario.perfil.nome}`}</p>
         <p>{`Disciplina : ${disciplinaSolicitada&&disciplinaSolicitada.nome}`}</p>
        {professor && professor.perfil.nome ? <p>Professor : {professor.perfil.nome}</p> :<p>    &nbsp;</p>}
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