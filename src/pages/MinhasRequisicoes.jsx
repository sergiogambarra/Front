import React from 'react';
import TituloPagina from '../components/TituloPagina';
import TabelaAproveitamentos from '../components/TabelaAproveitamentos';
import TabelaCertificacoes from '../components/TabelaCertificacoes';


export default function MinhasRequisicoes() {
  return (
    <>
      <TituloPagina titulo={'Minhas Requisições'} />
      <div className="d-flex">
        <div className="col-6">
          <TabelaAproveitamentos />
        </div>
        <div className="col-6">
          <TabelaCertificacoes />
        </div>
      </div>
    </>
  );
}
