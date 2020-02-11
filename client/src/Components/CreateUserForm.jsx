import React from 'react';
import {  Row, Col, Label } from 'reactstrap';
import { GoldButton } from '../Styles'
import { AvForm, AvField, AvFeedback, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { useAuth0 } from '../react-auth0-spa';

const CreateUserForm = ({ handleInputChange, entities, roleTypes }) => {

  return (
    <>
      <Row>
        <Col>
          <AvForm onValidSubmit={console.log}>
            <AvField onChange={(e) => handleInputChange(e)} name="firstName" label="First Name:" type="text" required placeholder="Bob" />
            <AvField onChange={(e) => handleInputChange(e)} name="lastName" label="Last Name:" type="text" required placeholder="West" />
            <AvField onChange={(e) => handleInputChange(e)} type="select" name="entity" label="Corporate Entity:" helpMessage="Please select which entity you work for officially..." validate={{required: {value: true, errorMessage: 'Please select an entity from the list'}}}>
              <option value="">Select Entity...</option>
              {
                entities.map((name) => <option>{name}</option>)
              }
            </AvField>
            <AvField onChange={(e) => handleInputChange(e)} type="select" name="entity" label="Corporate Entity:" helpMessage="Please select which best describes you..." validate={{required: {value: true, errorMessage: 'Please select an entity from the list'}}}>
              <option value="">Select Role...</option>
              {
                roleTypes.map((name) => <option>{name}</option>)
              }
            </AvField>
            <GoldButton>Submit</GoldButton>
          </AvForm>
        </Col>
      </Row>
    </>
  )
};

export default CreateUserForm;
