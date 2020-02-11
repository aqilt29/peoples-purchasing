import React from 'react';
import { Container, Row, Col, Progress, Form, FormGroup, Label, Input } from 'reactstrap';
import RequestHeaders from './requestForms/requestHeaders';
import RequestItems from './requestForms/requestItems';
import RequestApprovers from './requestForms/requestApprovers';
import RequestDone from './requestForms/RequestDone';
import { BlueButton } from '../Styles';
import { AvForm } from 'availity-reactstrap-validation';


const PurchaseForm = ({ listOfEntities, submitNewForm, handleChange, currentStep, incrementStep, decrementStep, listOfVendors, listOfApprovingUsers, listOfUsers }) => {
  console.log(currentStep)

  return (
    <Container className="text-left">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <AvForm onValidSubmit={console.log}>
            {
              currentStep === 0 ? <RequestHeaders listOfVendors={listOfVendors} handleChange={handleChange} listOfUsers={listOfUsers} listOfEntities={listOfEntities} /> : null
            }
            {
              currentStep === 1 ? <RequestItems handleChange={handleChange} /> : null
            }
            {
              currentStep === 2 ? <RequestApprovers listOfApprovingUsers={listOfApprovingUsers} handleChange={handleChange} /> : null
            }
            {
              currentStep === 3 ? <RequestDone submitNewForm={submitNewForm} /> : null
            }
        </AvForm>
        { currentStep >= 1 && <BlueButton onClick={decrementStep}>...Back</BlueButton>}
        <BlueButton onClick={incrementStep}>Next...</BlueButton>
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="my-2" md={{ size: 6, offset: 3 }}>
          <Progress animated value={(currentStep / 3) * 100} />
        </Col>
      </Row>
    </Container>
  )
};

export default PurchaseForm;
