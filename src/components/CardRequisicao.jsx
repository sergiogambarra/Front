import React from 'react';
import { Card } from 'react-bootstrap';

export default () => {
  return (
    <Card>
      <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
          </Card.Text>
          <Card.Link href="#">Visualizar</Card.Link>
      </Card.Body>
    </Card>
  );
}