import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { BlueButton } from '../../../Styles';
import VendorSelect from '../../VendorSelect';
import UserSelect from '../../UserSelect';
import { listOfBuyers, listOfPaymentTerms, listOfShippingAddresses } from '../../../utils/lists';
import EntitySelect from '../../EntitySelect';

export const PurchaseReqHeaders = ({ setHeaders }) => {
  const [vendor, setVendor] = useState(null)
  const [entity, setEntity] = useState(null)
  const [user, setUser] = useState(null)
  const [isValid, setValid] = useState(false)

  const submitValidHeaders = (_, formData) => {

    const reqHeaders = {
      vendor: vendor.value,
      entity: entity.value,
      submittedFor: user.value,
      ...formData
    }
    console.log(reqHeaders);

    setHeaders(reqHeaders)
  }


  useEffect(() => {
    if (vendor && user) setValid(true)
  }, [vendor, user])

  return (
    <>
      <h5>Purchase Details</h5>
      <Container>
      <AvForm onValidSubmit={submitValidHeaders}>
        <Row>
          <Col>
            <VendorSelect  label="Select Vendor for Order:" vendorChange={setVendor} />
            <UserSelect label="Request on behalf of:" userChange={setUser} />
            <EntitySelect entityChange={setEntity} />
            <AvField
              required
              style={{ width: '75%' }}
              type="select"
              name="buyer"
              label="Employee Placing the Order:"
            >
              <option value="">Select A User...</option>
              {
                listOfBuyers.map(({ name, value }) => <option value={value}>{name}</option>)
              }
            </AvField>
          </Col>
          <Col>
              <AvField
              type="select"
              required
              name="paymentTerms"
              label="Payment Terms:"
              validate={{required: {value: true, errorMessage: 'Please select an option from the list'}}}
            >
              <option value="">Select Payment Terms...</option>
              {
                listOfPaymentTerms.map((term) => <option value={term}>{term}</option>)
              }
            </AvField>
            <AvField
              type="select"
              required
              name="shipTo"
              label="Delivery Address:"
              validate={{required: {value: true, errorMessage: 'Please select an option from the list'}}}
            >
              <option value="">Select Delivery Address Terms...</option>
              {
                listOfShippingAddresses.map((address) => <option value={address}>{address}</option>)
              }
            </AvField>
            <AvField
              required
              type="textarea"
              name="businessNeed"
              label="Describe Business Justification:"
              helpMessage="Please describe purchasing need..."
            />
          </Col>
        </Row>
        <Row>
          <BlueButton disabled={!isValid}>Next</BlueButton>
        </Row>
      </AvForm>
      </Container>
    </>
  )
};

