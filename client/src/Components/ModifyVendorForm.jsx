import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { GoldButton, BlueButton } from '../Styles'
import { modifyVendor } from '../api/vendorApi';

const ModifyVendorForm = ({ id }) => {

  const formRef = useRef(null);

  const submitModifications = async (_, data) => {
    let dataToModify = {};

    console.log({...data})
    for (let key in data) {
      if ((data[key] === "")) {
        console.log(data[key])
        continue
      } else if (key !== 'address') {
        console.log(data[key])
        dataToModify[key] = data[key]
      }
    }


    const modifiedData = await modifyVendor(id, dataToModify)
    console.log('modifiedData',modifiedData)
    window.location.reload()

    console.log(modifiedData)
  };

  return (
    <>
      <AvForm onValidSubmit={submitModifications} ref={formRef}>
        <Row>
          <Col>
            <AvField
              label="Vendor Name"
              name="name"
              type="text"
              placeholder="Input Vendor Name..."
            />
            <AvField
              label="Website"
              name="website"
              type="text"
              placeholder="www.Vendor.com..."
            />
            <AvField
              label="Point of Contact"
              name="attn"
              type="text"
              placeholder="Jack Herrer..."
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
              placeholder="your.contact@vendor.com..."
            />
            <AvField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="(949) Your - Vendor"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <GoldButton>Submit</GoldButton>{" "}
            <BlueButton onClick={() => formRef.current.reset()}>Clear</BlueButton>
          </Col>
        </Row>
        <hr />
      </AvForm>
    </>
  )
};

export default ModifyVendorForm;
