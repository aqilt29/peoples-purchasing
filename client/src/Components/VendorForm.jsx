import React from 'react';
import { Container, Row, Col, Progress, Form, FormGroup, Label, Input } from 'reactstrap';
import { GoldButton } from '../Styles';

const VendorForm = ({ totalProgress }) => {
  return (
    <Container>
      <Row className="text-left">
        <Col>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" placeholder="Input Company Name..."/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" placeholder="Contact Email..."/>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input type="textarea" name="address" placeholder="Company Address..."/>
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input type="text" name="phoneNumber" placeholder="Contact Number..."/>
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Have a signed W9?</legend>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="hasW9" />{' '}
                  Yes
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="hasW9" />{' '}
                  No
                </Label>
              </FormGroup>
            </FormGroup>
            <GoldButton>Submit</GoldButton>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default VendorForm;
