import React from 'react';
import { Container, Row, Col, Progress, Form, FormGroup, Label, Input } from 'reactstrap';

const PurchaseForm = ({ handleChange }) => {
  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h6>Form Basics</h6>
          <Form>
            <FormGroup>
              <Label for="submittedFor">Submitted For:</Label>
              <Input onChange={(e) => handleChange(e)} type="text" name="submittedFor" placeholder="Submitted on behalf of..." />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default PurchaseForm;
