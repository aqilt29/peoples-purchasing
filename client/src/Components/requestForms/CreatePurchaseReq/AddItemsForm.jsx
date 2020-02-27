import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import LedgerSelect from '../../LedgerSelect';
import { BlueButton } from '../../../Styles';

export const AddItemsForm = ({ addItem, deleteItem }) => {

  const [isValid, setIsValid] = useState(false)
  const [ledgerAndMaterial, setLedgerAndMaterial] = useState(null)
  const [ledgerIsValid, setLedgerIsValid] = useState(false)

  useEffect(() => {
    //  useEffect to see if all elements are valid to add item
    if(ledgerIsValid) setIsValid(true)
    if(!ledgerIsValid) setIsValid(false)
  })

  useEffect(() => {
    console.log(ledgerAndMaterial)
  }, [ledgerAndMaterial])

  return (
    <>
      <h5>Items Form</h5>
      <Container>
        <AvForm onValidSubmit={() => console.log(ledgerAndMaterial)}>
          <Row>
            <Col>
              <h5>Item Details</h5>
              <LedgerSelect
                setValid={setLedgerIsValid}
                ledgerChange={setLedgerAndMaterial}
              />
            </Col>
          </Row>
          <BlueButton disabled={!isValid}>Add Item</BlueButton>
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

