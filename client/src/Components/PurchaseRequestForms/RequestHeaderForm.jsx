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
              name="referenceName"
              id="referenceName"
              component={ReactstrapInput}
            />
            <EntitySelect
              name="entity"
              label="Select Purchasing Entity:"
            />
            <Field
              type="textarea"
              label="Request Details:"
              name="businessNeed"
              id="businessNeed"
              placeholder="Please provide detailed information for the purpose of your purchase..."
              component={ReactstrapInput}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Shipping Information</h5>
            <Field
              type="text"
              label="Address"
              placeholder="1234 Main St"
              name="shippingAddress.address"
              id="shippingAddress.address"
              component={ReactstrapInput}
            />
            <Field
              type="text"
              label="Address 2"
              placeholder="Apt, Suite, or Floor"
              name="shippingAddress.address2"
              id="shippingAddress.address2"
              component={ReactstrapInput}
            />
            <Row form>
              <Col>
                <Field
                  type="text"
                  label="City"
                  name="shippingAddress.city"
                  id="shippingAddress.city"
                  component={ReactstrapInput}
                />
              </Col>
              <Col>
                <Field
                  type="text"
                  label="State"
                  name="shippingAddress.state"
                  id="shippingAddress.state"
                  component={ReactstrapInput}
                />
              </Col>
              <Col>
                <Field
                  type="text"
                  label="Zip"
                  name="shippingAddress.zipCode"
                  id="shippingAddress.zipCode"
                  component={ReactstrapInput}
                />
              </Col>
            </Row>
          </Col>
        </Row>
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