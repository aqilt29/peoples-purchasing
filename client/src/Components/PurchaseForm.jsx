import React from 'react';
import { Container, Row, Col, Progress, Form, FormGroup, Label, Input } from 'reactstrap';
import RequestHeaders from './requestForms/requestHeaders';
import RequestItems from './requestForms/requestItems';
import RequestApprovers from './requestForms/requestApprovers';
import RequestDone from './requestForms/RequestDone';
import { BlueButton } from '../Styles';


const PurchaseForm = ({ handleChange, currentStep, incrementStep }) => {
  console.log(currentStep)

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          {
            currentStep === 0 ? <RequestHeaders /> : null
          }
          {
            currentStep === 1 ? <RequestItems /> : null
          }
          {
            currentStep === 2 ? <RequestApprovers /> : null
          }
          {
            currentStep === 3 ? <RequestDone /> : null
          }
        </Col>
      </Row>
      <BlueButton onClick={incrementStep}>Next...</BlueButton>
    </Container>
  )
};

export default PurchaseForm;
