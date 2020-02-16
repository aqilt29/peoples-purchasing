import React from 'react';
import { Container, Row, Col, Progress, Form, FormGroup, Label, Input } from 'reactstrap';
import RequestHeaders from './requestForms/requestHeaders';
import RequestItems from './requestForms/requestItems';
import RequestReview from './requestForms/RequestReview';
import RequestDone from './requestForms/RequestDone';
import { BlueButton } from '../Styles';
import ItemList from './requestForms/ItemList';

const PurchaseForm = ({ submitNewForm, handleChange, currentStep, decrementStep, listOfVendors, listOfUsers, ...rest }) => {

  const offset = (currentStep === 1) || (currentStep === 2) ? 0 : 3;
  let size = currentStep === 1 ? 4 : 6;

  if (currentStep === 2) size = 12

  console.log(offset, size)
  return (
    <Container className="text-left">
      <Row>
        <Col sm="12" md={{ size: size, offset: offset  }}>
          {
            currentStep === 0 ? <RequestHeaders listOfVendors={listOfVendors} handleChange={handleChange} listOfUsers={listOfUsers} {...rest}/> : null
          }
          {
            currentStep === 1 ? <RequestItems {...rest} /> : null
          }
          {
            currentStep === 2 ? <RequestReview listOfVendors={listOfVendors} {...rest} /> : null
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
