import React from 'react';
import { Field, FieldArray, useFormikContext, Form } from 'formik';
import { Col, Row } from 'reactstrap';
import { FormikReactStrapInput } from '../FormikFields';
import { ItemsCart } from '.';

const RequestItemsForm = () => {
  const { values, setFieldValue, ...rest } = useFormikContext()
  console.log(values, rest)

  return (
    <>
      <FieldArray
          name="friends"
          render={arrayHelpers => (
            <div>
              <Row>
                <Col>
                  <h3>Add Items to Purchase</h3>
                  <div>
                    <Field label="Item Name/Description" name={'itemToAdd.description'} component={FormikReactStrapInput}/>
                    <Field label="Special Details" placeholder="Special Instructions or Use Case for Item" name={'itemToAdd.specialDetails'} component={FormikReactStrapInput}/>
                  </div>

                  <button
                      type="button"
                      onClick={() => {
                        setFieldValue('itemToAdd.specialDetails', '')
                        arrayHelpers.push(values.itemToAdd)
                      }}
                  >
                      +
                  </button>
                </Col>
                <Col>
                  <h3>Items List...</h3>
                  <ItemsCart items={values.friends} arrayHelpers={arrayHelpers}/>
                </Col>
              </Row>
            </div>
          )}
      />
    </>
  )
};

export default RequestItemsForm;
