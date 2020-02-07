import React, { useState } from 'react';
import { Container, Row, Col, Progress, Form, FormGroup, Label, Input } from 'reactstrap';
import { GoldButton } from '../Styles';

const VendorForm = ({ handleInput, formIsValid, setValid }) => {

  return (
    <Container>
      <Row className="text-left">
        <Col>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input onChange={(e) => handleInput(e)} type="text" name="name" placeholder="Input Company Name..."/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input onChange={(e) => handleInput(e)} type="email" name="email" placeholder="Contact Email..."/>
            </FormGroup>
            <FormGroup>
              <Label for="website">Website</Label>
              <Input onChange={(e) => handleInput(e)} type="text" name="website" placeholder="Company Website..."/>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input onChange={(e) => handleInput(e)} type="textarea" name="address" placeholder="Company Address..."/>
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input onChange={(e) => handleInput(e)} type="text" name="phoneNumber" placeholder="Contact Number..."/>
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Have a signed W9?</legend>
              <FormGroup check>
                <Label check>
                  <Input onChange={(e) => handleInput(e)} type="radio" name="hasW9" value={true} />{' '}
                  Yes
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input onChange={(e) => handleInput(e)} type="radio" name="hasW9" value={false} />{' '}
                  No
                </Label>
              </FormGroup>
            </FormGroup>
            <GoldButton disabled={!formIsValid ? true : false }>Submit</GoldButton>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default VendorForm;
