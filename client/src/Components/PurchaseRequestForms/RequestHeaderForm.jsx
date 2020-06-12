import React, { useState, useEffect } from 'react';
import { Field } from 'formik';
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

const ConsoleTheHOCProps = (props) => <h5>{console.log(props)}</h5>

const RequestHeaderForm = ({ values, errors, touched }) => {

  //  get the list of entities from the API
  // const [entityList, setEntityList] = useState([])

  return (
    <>
      <h3>RequestHeaderForm</h3>
      <Col xs={{ size: 6, offset: 3 }}>
        <Row>
          <Col>
            <Field
              type="text"
              label="Project Name or Reference:"
              name="project"
              id="project"
              valid={(!errors.project && values.project.length > 1)}
              component={ReactstrapInput}
            />
            {console.log(values, errors, touched)}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleSelect">Select Purchasing Entity</Label>
              <Field
                  type="text"
                  label="Purchasing Entity:"
                  name="entity"
                  id="entity"
                  as={Input}
               >
                {({ ...props }) => (


                    <pre>{JSON.stringify(props, null, 2)}</pre>
                  )}
               </Field>
                <FormText>This is a group!</FormText>
            </FormGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <EntitySelect
              name="entity"
            />
            {/* <Field
                type="text"
                label="Project Name or Reference:"
                name="project"
                id="project"
                valid={(!errors.project && values.project.length > 1)}
                component={ConsoleTheHOCProps}
              /> */}
          </Col>
        </Row>
      </Col>
      <BlueButton>Submit</BlueButton>
    </>
  )
};

export default RequestHeaderForm;
