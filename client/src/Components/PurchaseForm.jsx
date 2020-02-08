import React from 'react';
import { Container, Row, Col, Progress } from 'reactstrap';

const PurchaseForm = ({ totalProgress }) => {
  return (
    <Container>
      <Row>
        <Col>
          <p>this is PurchaseForm</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>progress bar</p>
          <Progress animated value={totalProgress}/>
        </Col>
      </Row>
    </Container>
  )
};

export default PurchaseForm;
