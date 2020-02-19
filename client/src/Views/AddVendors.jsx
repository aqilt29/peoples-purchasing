import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { GoldButton } from '../Styles'
import Loading from '../Components/Loading';
import { createVendor } from '../api/vendorApi'

const AddVendors = () => {

  const [newVendor, setNewVendor] = useState(null);
  const formRef = useRef(null)

  const submitVendor = async (_, data) => {
    console.log(data)
    //  submit a new vendor using api
    let response;

    try {
      response = await createVendor(data)
      setNewVendor(response)
    } catch (error) {
      window.alert(error)
    }

    formRef.current.reset()
  }

  return (
    <>
      <h3>Add New Vendors</h3>
      <Container>
        <AvForm onValidSubmit={submitVendor} ref={formRef}>
          <h6>Vendor Info</h6>
          <Row>
            <Col>
              <AvField
                label="Vendor Name"
                name="name"
                type="text"
                required
                placeholder="Input Vendor Name..."
              />
              <AvField
                label="Website"
                name="website"
                type="text"
                placeholder="www.Vendor.com..."
              />
              <div className="mb-5">
                <AvGroup check>
                  <Label check>
                    <AvInput type="checkbox" name="is1099" /> Is 1099 Eligible?
                  </Label>
                </AvGroup>
                <AvGroup check>
                  <Label check>
                    <AvInput type="checkbox" name="hasW9" /> Has a W9?
                  </Label>
                </AvGroup>
              </div>
            </Col>
            <Col>
              <AvField
                label="Vendor Email"
                name="email"
                type="email"
                required
                placeholder="your.contact@vendor.com..."
              />
              <AvField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                required
                placeholder="(949) Your - Vendor"
              />
            </Col>
          </Row>
          <h6>Bill To Address</h6>
          <Row>
            <Col>
              <AvField
                label="Street Address"
                name="address.street"
                type="text"
                required
                placeholder="420 Weed St #4200"
              />
              <AvField
                label="State"
                name="address.state"
                type="text"
                required
                placeholder="CA"
              />
            </Col>
            <Col>
              <AvField
                label="City"
                name="address.city"
                type="text"
                required
                placeholder="Humboldt"
              />
              <AvField
                label="Zip Code"
                name="address.zipCode"
                validate={{
                  minLength: { value: 5},
                  required: true,
                }}
                placeholder="92420"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <GoldButton>Submit</GoldButton>
            </Col>
          </Row>
        </AvForm>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Success Data</h6>
            {
              newVendor && (
                <div>
                  Values: <pre>{JSON.stringify(newVendor, null, 2)}</pre>
                </div>
              )
            }
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default AddVendors;
