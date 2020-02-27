import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import LedgerSelect from '../../LedgerSelect';

export const AddItemsForm = ({ addItem, deleteItem }) => {

  return (
    <>
      <h5>Items Form</h5>
      <Container>
        <AvForm>
          <Row>
            <Col>
              <h5>Item Details</h5>
              <LedgerSelect />
            </Col>
          </Row>
        </AvForm>
        <hr />
        <Row>
          <Col>
            <h5>Items List</h5>
          </Col>
        </Row>
      </Container>
    </>
  )
};

