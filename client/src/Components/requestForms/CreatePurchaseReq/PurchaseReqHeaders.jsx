import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { BlueButton } from '../../../Styles';
import VendorSelect from '../../VendorSelect';
import UserSelect from '../../UserSelect';
import { listOfBuyers } from '../../../utils/lists';
import EntitySelect from '../../EntitySelect';

export const PurchaseReqHeaders = () => {
  const [vendor, setVendor] = useState(null)
  const [entity, setEntity] = useState(null)
  const [user, setUser] = useState(null)
  const [isValid, setValid] = useState(false)

  const submitValidHeaders = (_, formData) => {
    console.log({
      vendor: vendor.value,
      submittedFor: user.value,
      ...formData
    })

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

