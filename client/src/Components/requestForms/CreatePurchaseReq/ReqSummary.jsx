import React from 'react';
import { BlueButton } from '../../../Styles';
import { Container, Row, Col } from 'reactstrap';

export const ReqSummary = ({ decrementStep, ...reqData }) => {

  console.log(Object.keys(reqData))

  return (
    <>
      <h5>ReqSummary</h5>
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <hr />
        <Row>
          <Col></Col>
        </Row>
      </Container>
      <BlueButton onClick={decrementStep} >Go Back</BlueButton>
    </>
  )
};

