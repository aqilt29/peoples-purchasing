import React from 'react';
import { Field } from 'formik';
import { Row, Col, Label } from 'reactstrap';
import { FormikReactStrapInput, FormikReactStrapRadio, FormikEntitySelect } from '../FormikFields';

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
              component={FormikReactStrapInput}
            />
            <FormikEntitySelect
              name="entity"
              label="Select Purchasing Entity:"
            />
            <Field
              type="textarea"
              label="Request Details:"
              name="businessNeed"
              id="businessNeed"
              placeholder="Please provide detailed information for the purpose of your purchase..."
              component={FormikReactStrapInput}
            />
            <Label className="mr-2">Request Buying Assistance?</Label>
            <Field
              name="needBuyer"
              value="true"
              type="radio"
              label="True"
              component={FormikReactStrapRadio}
            />
            <Field
              name="needBuyer"
              value="false"
              type="radio"
              label="False"
              component={FormikReactStrapRadio}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h5>Shipping Information</h5>
            <Field
              type="text"
              label="Address"
              placeholder="1234 Main St"
              name="shippingAddress.address"
              id="shippingAddress.address"
              component={FormikReactStrapInput}
            />
            <Field
              type="text"
              label="Address 2"
              placeholder="Apt, Suite, or Floor"
              name="shippingAddress.address2"
              id="shippingAddress.address2"
              component={FormikReactStrapInput}
            />
            <Row form>
              <Col>
                <Field
                  type="text"
                  label="City"
                  name="shippingAddress.city"
                  id="shippingAddress.city"
                  component={FormikReactStrapInput}
                />
              </Col>
              <Col>
                <Field
                  type="text"
                  label="State"
                  name="shippingAddress.state"
                  id="shippingAddress.state"
                  component={FormikReactStrapInput}
                />
              </Col>
              <Col>
                <Field
                  type="text"
                  label="Zip"
                  name="shippingAddress.zipCode"
                  id="shippingAddress.zipCode"
                  component={FormikReactStrapInput}
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

