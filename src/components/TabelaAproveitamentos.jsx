import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { getAproveitamentos } from '../services/RequisicaoService';
import CardAproveitamento from '../components/CardAproveitamento';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './tabelarequisicoes.css';

export default function ({ user }) {
  const [requisicoes, setRequisicoes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(false);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    setIsLoading(true);
    getAproveitamentos(user)
      .then(result => {
        setRequisicoes(result);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [user]);

  const control = (e) => {
    if (e.target.id === "+") {
      setPage({ page:  + 1 })
    } else {
      setPage({ page:  - 1})
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <h5 className="row d-flex justify-content-center titulo">Aproveitamento de estudos</h5>
          {error && <Alert variant='danger'>Não foi possível carregar suas requisições.</Alert>}
        </Col>
      </Row>
      <Row sm={12} style={{
        height: '200px'
      }}>
        {
          isLoading
            ?
            <div style={{ minHeight: '300px' }} className="d-flex justify-content-center align-items-center text-primary">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            :
            requisicoes && requisicoes.map((requisicao) => <CardAproveitamento requisicao={requisicao} />)
        }
        
      </Row>
      <Row>
      {
          <>
            {first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}
                                &nbsp;&nbsp;
        {last || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}
            <span style={{ float: "right" }}>Página  {page + 1} / {total}</span>
          </>

        }
      </Row>
    </Container>
  );
}