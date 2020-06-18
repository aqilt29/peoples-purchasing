import React, { useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { ReactstrapInput, ReactstrapSelect } from 'reactstrap-formik'
import { Row, Col, FormText, Input, FormGroup, Label } from 'reactstrap';
import EntitySelect from '../EntitySelect';
import { BlueButton } from '../../Styles';
// import * as yup from 'yup';

const exampleListOfEntities = [
  'New Patriot Holdings',
  'Peoples Retail - Santa Ana',
  'Peoples Retail - Los Angeles',
  'Peoples Retail - Riverside',
];

// const ConsoleTheHOCProps = (props) => <h5>{console.log(props)}</h5>

const RequestHeaderForm = ({ values, errors, touched }) => {

  return (
    <>
      <h3>New Request Information</h3>
      <Col md={{ size: 6, offset: 3 }}>
        <Row>
          <Col>
          <h5>Purchasing Information</h5>
            <Field
              type="text"
              label="Reference or Project Name:"
              name="project"
              id="project"
              component={ReactstrapInput}
            />
            <EntitySelect
              name="entity"
              label="Select Purchasing Entity"
            />
            <FormGroup>
              <Label for="purchaseReason">Request Details</Label>
              <Input
                type="textarea"
                name="purchaseReason"
                id="purchaseReason"
                placeholder="Please provide detailed information for the purpose of your purchase..."
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Shipping Information</h5>
            <FormGroup>
              <Label for="deliveryAddress.streetAddressLine">Address</Label>
              <Input type="text" name="deliveryAddress.streetAddressLine" id="deliveryAddress.streetAddressLine" placeholder="1234 Main St"/>
            </FormGroup>
            <FormGroup>
              <Label for="deliveryAddress.streetAddressLine2">Address 2</Label>
              <Input type="text" name="address2" id="deliveryAddress.streetAddressLine2" placeholder="Apartment, studio, or floor"/>
            </FormGroup>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="deliveryAddress.city">City</Label>
                  <Input type="text" name="city" id="deliveryAddress.city"/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="deliveryAddress.state">State</Label>
                  <Input type="text" name="state" id="deliveryAddress.state"/>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="deliveryAddress.zipCode">Zip</Label>
                  <Input type="text" name="zip" id="deliveryAddress.zipCode"/>
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <BlueButton>Next</BlueButton> */}
      </Col>
    </>
  )
};

export default RequestHeaderForm;



/**
 *
 *
 * Field use to investigate formik's API
 * <Field
 *   type="text"
 *   label="Project Name or Reference:"
 *   name="project"
 *   id="project"
 *   valid={(!errors.project && values.project.length > 1)}
 *   component={ConsoleTheHOCProps}
 * />
 *
 *
 * Field used to print the Field API on screen
 * <Field
 *   type="text"
 *   label="Purchasing Entity:"
 *   name="entity"
 *   id="entity"
 *   as={Input}
 * >
 *  {({ ...props }) => (
 *      <pre>{JSON.stringify(props, null, 2)}</pre>
 *    )}
 * </Field>
 *
 */