import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { getAproveitamentos } from '../services/RequisicaoService';
import CardAproveitamento from '../components/CardAproveitamento';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './tabelarequisicoes.css';

export default function(props) {
  const [requisicoes, setRequisicoes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    getAproveitamentos()
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
     <Container fluid>
       <Row>
          <Col>
               <h5 className="row d-flex justify-content-center titulo">Aproveitamento de estudos</h5>
               {error && <Alert variant='danger'>Não foi possível carregar suas requisições.</Alert>}
          </Col>
        </Row>
        <Row sm={12}>
                {
                  isLoading 
                ? 
                  <div style={{ minHeight: '300px' }} className="d-flex justify-content-center align-items-center text-primary">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                :
                  requisicoes && requisicoes.map((requisicao) => <CardAproveitamento requisicao={requisicao}/>)
                }    
      </Row>   
    </Container>
  );
}