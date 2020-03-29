import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { getCertificacoes } from '../services/RequisicaoService';
import CardCertificacao from '../components/CardCertificacao';
import './tabelarequisicoes.css';

export default function () {
  const [requisicoes, setRequisicoes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCertificacoes()
      .then(result => {
        setRequisicoes(result);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h5 class="row d-flex justify-content-center">Certificação de conhecimentos</h5>
      {error && <Alert variant="danger">Não foi possível carregar suas requisições.</Alert>}
      {isLoading ? <div style={{ minHeight: '300px' }} className="d-flex align-items-center justify-content-center text-primary">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div> : requisicoes && requisicoes.map(requisicao => <CardCertificacao requisicao={requisicao} />)}
    </>
  );
}