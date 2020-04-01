import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'



export default function TelaTransicao() {
  const path = './images/APROVEITAMENTO-ESTUDOS.png'; 

  return (
    <Container>
    <Row>
    <Col></Col>
    <Col xs={4} md={6} lg={8}>
      <Card style={{ width: '50 rem' }}>
          <Card.Img variant="top" src={path} />
          <Card.Body>
            <Card.Title>Portal de Requisição de Aproveitamento de Matrícula ou Certificação de Conhecimentos.</Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    <Col></Col>
      
    </Row>
  </Container>
  );
}
