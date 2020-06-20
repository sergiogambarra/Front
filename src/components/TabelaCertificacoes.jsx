import React, { useState, useEffect } from 'react';
import { getCertificacoes } from '../services/RequisicaoService';
import { Loading } from '../auxiliares/Load';
import CardCertificacao from '../components/CardCertificacao';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import './tabelarequisicoes.css';


export default function ({ user }) {
  const [requisicoes, setRequisicoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getCertificacoes(user, page)
      .then(result => {
        setRequisicoes(result.content);
        setFirst(result.first);
        setLast(result.last);
        setTotal(result.totalPages);
        setIsLoading(false);
      })
      .catch(error => {
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
    <Container>
      <Row style={{ textAlign: "center" }}>
        {requisicoes.length > 0 && <h5 style={{ margin: "2% auto" }}>Certificação de conhecimentos</h5>}
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
        {requisicoes.length > 0 &&
          <>
            {last || <button id="+" onClick={(e) => control(e)}>Próximo</button>}
                                &nbsp;&nbsp;
            {first || <button id="-" onClick={(e) => control(e)}>Anterior</button>}
          </>

        }
        {requisicoes.length > 0 && <span style={{ position: 'relative', left: '70%' }} >Página  {page + 1} / {total}</span>}
      </Row>
    </Container>
  );
}