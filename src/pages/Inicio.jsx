import React from 'react';
import TituloPagina from '../components/TituloPagina';
import { relative } from 'path';
import { Link } from 'react-router-dom'

export default function Inicio() {
  const path = './images/APROVEITAMENTO-ESTUDOS.png'; 

  return (
    <div style={{position:'relative', top:"10px", left :'13%'}}>
      <div className="card" style={{width:"50rem", position:relative}}>
        <img src={path} className="card-img-top" alt="..." />
        <div className="card-body"style={{position:'relative'}}>
          <TituloPagina titulo={'Portal de Requisição de Aproveitamento de Matrícula ou Certificação de Conhecimentos.'} />
          
          
          <Link to="/login" className="btn btn-primary">Login </Link>
        </div>
      </div>
    </div>
  );
}
