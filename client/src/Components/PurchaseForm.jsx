import React from 'react';
import { Container, Row, Col, Progress, Form, FormGroup, Label, Input } from 'reactstrap';
import RequestHeaders from './requestForms/requestHeaders';
import RequestItems from './requestForms/requestItems';
import RequestApprovers from './requestForms/requestApprovers';
import RequestDone from './requestForms/RequestDone';
import { BlueButton } from '../Styles';
import ItemList from './requestForms/ItemList';

const PurchaseForm = ({ submitNewForm, handleChange, currentStep, incrementStep, decrementStep, listOfVendors, listOfApprovingUsers, listOfUsers, ...rest }) => {

  const offset = currentStep === 1 ? 0 : 3;
  const size = currentStep === 1 ? 4 : 6;

  return (
    <Container className="text-left">
      <Row>
        <Col sm="12" md={{ size: size, offset: offset  }}>
          {
            currentStep === 0 ? <RequestHeaders incrementStep={incrementStep} listOfVendors={listOfVendors} handleChange={handleChange} listOfUsers={listOfUsers} {...rest}/> : null
          }
          {
            currentStep === 1 ? <RequestItems incrementStep={incrementStep} {...rest} /> : null
          }
          {
            currentStep === 2 ? <RequestApprovers listOfApprovingUsers={listOfApprovingUsers} handleChange={handleChange} /> : null
          }
          {
            currentStep === 3 ? <RequestDone submitNewForm={submitNewForm} /> : null
          }
        { currentStep >= 1 && <BlueButton onClick={decrementStep}>Back</BlueButton>}
        </Col>
        {
          currentStep === 1 ? <Col><ItemList items={rest.items} deleteItem={rest.deleteItem} /></Col> : null
        }
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
