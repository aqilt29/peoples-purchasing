import React from 'react';
import { Container, Row, Col, Progress } from 'reactstrap';

const VendorForm = ({ totalProgress }) => {
  return (
    <Container>
      <Row>
        <Col>
          <p>this is VendorForm</p>
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

export default VendorForm;
