import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { getCertificacoes } from '../services/RequisicaoService';
import { Loading } from '../auxiliares/Load';
import CardCertificacao from '../components/CardCertificacao';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import './tabelarequisicoes.css';


export default function (user) {
  const [requisicoes, setRequisicoes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(false);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getCertificacoes(user)
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
      setPage({ page: + 1 })
    } else {
      setPage({ page: - 1 })
    }
  }
  return (
    <Container>
      <Row style={{textAlign:"center"}}>
          <h5 style={{margin:"2% auto"}}>Certificação de conhecimentos</h5>
          {error && <Alert variant='danger'>Não foi possível carregar suas requisições.</Alert>}
      </Row>
      <Row>
        {
          isLoading
            ?
          <Loading />
            :
            requisicoes && requisicoes.map((requisicao) => <CardCertificacao requisicao={requisicao} />)
        }
      </Row>
      <Row>
      {
          <>
            {first || <button id="-" onClick={(e) => this.control(e)}>Anterior</button>}
                                &nbsp;&nbsp;
        {last || <button id="+" onClick={(e) => this.control(e)}>Próximo</button>}
            <span style={{textAlign:"right"}} >Página  {page + 1} / {total}</span>
          </>

        }
      </Row>
    </Container>
  );
}