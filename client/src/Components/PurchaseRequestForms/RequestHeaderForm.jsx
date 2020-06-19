import React from 'react';
import { Field } from 'formik';
import { ReactstrapRadio } from 'reactstrap-formik'
import { Row, Col, Label } from 'reactstrap';
import EntitySelect from '../EntitySelect';
import { FormikReactStrapInput } from '../FormikFields';

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
              component={FormikReactStrapInput}
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
              component={FormikReactStrapInput}
            />
            <Label className="mr-2">Request Buying Assistance?</Label>
            <Field
              name="needBuyer"
              value="true"
              type="radio"
              label="True"
              component={ReactstrapRadio}
            />
            <Field
              name="needBuyer"
              value="false"
              type="radio"
              label="False"
              component={ReactstrapRadio}
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