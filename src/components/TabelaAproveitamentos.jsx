import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { getAproveitamentos } from '../services/RequisicaoService';
import CardAproveitamento from '../components/CardAproveitamento';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import './tabelarequisicoes.css';

export default function ({ user }) {
  const [requisicoes, setRequisicoes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    setIsLoading(true);
    getAproveitamentos(user, page)
      .then(result => {
        console.log(result);
        setRequisicoes(result.content);
        setFirst(result.first);
        setLast(result.last);
        setTotal(result.totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [user, page]);

  const control = (e) => {
    if (e.target.id === "+") {
      setPage(page + 1)
    } else {
      setPage(page - 1)
    }
  }
  return (
    <Container >
      <Row style={{ textAlign: "center" }}>
          <h5  style={{ margin: "2% auto" }}>Aproveitamento de estudos</h5>
          {error && <Alert variant='danger'>Não foi possível carregar suas requisições.</Alert>}
      </Row>
      <Row >
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
            {first || <button id="-" onClick={(e) => control(e)}>Anterior</button>}
                                &nbsp;&nbsp;
        {last || <button id="+" onClick={(e) => control(e)}>Próximo</button>}
          </>

        }
        <span style={{ position: 'relative', left: '70%' }} >Página  {page + 1} / {total}</span>
      </Row>
    </Container>
  );
}