import React from 'react';
import {  Row, Col } from 'reactstrap';
import { GoldButton } from '../Styles'
import { AvForm, AvField } from 'availity-reactstrap-validation';

const CreateUserForm = ({ handleUserSubmission, handleInputChange, entities, roleTypes }) => {

  return (
    <>
      <Row>
        <Col>
          <AvForm onValidSubmit={handleUserSubmission}>
            <AvField onChange={(e) => handleInputChange(e)} name="firstName" label="First Name:" type="text" required placeholder="Bob" />
            <AvField onChange={(e) => handleInputChange(e)} name="lastName" label="Last Name:" type="text" required placeholder="West" />
            <AvField onChange={(e) => handleInputChange(e)} type="select" name="entity" label="Corporate Entity:" helpMessage="Please select which entity you work for officially..." validate={{required: {value: true, errorMessage: 'Please select an entity from the list'}}}>
              <option value="">Select Entity...</option>
              {
                entities.map((name) => <option>{name}</option>)
              }
            </AvField>
            <AvField onChange={(e) => handleInputChange(e)} type="select" name="role" label="Role:" helpMessage="Please select which best describes you..." validate={{required: {value: true, errorMessage: 'Please select an entity from the list'}}}>
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
