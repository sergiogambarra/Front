import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'



export default function Inicio() {
  const path = './images/APROVEITAMENTO-ESTUDOS.png'; 

  return (
    <Container>
    <Row>
    <Col></Col>
    <Col xs={4} md={6} lg={8}>
      <Card style={{ width: '50 rem' }}>
          <Card.Img variant="top" src={path} />
          <Card.Body>
            <Card.Title>Portal de Requisição de Aproveitamento de Estudos ou Certificação de Conhecimentos.</Card.Title>
            <Card.Text>
            <Link to="/login" className="btn btn-primary">Login </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </Row>
  </Container>
  );
}
