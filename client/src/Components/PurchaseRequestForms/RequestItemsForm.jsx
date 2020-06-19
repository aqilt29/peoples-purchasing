import React from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { Col, Row } from 'reactstrap';
import { FormikReactStrapInput } from '../FormikFields';

const RequestItemsForm = () => {
  const { values, ...rest } = useFormikContext()
  console.log(values, rest)

  return (
    <>
      <h3>Add Items to Purchase</h3>
      <Row>
        <Col>
          <FieldArray
            name="friends"
            render={arrayHelpers => (
              <div>
                  {values.friends.map((friend, index) => (
                      <div key={index}>
                          <Field label="name" name={`friends.${index}.name`} />
                          <Field label="age" name={`friends.${index}.age`} />
                          <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                          >
                              -
                          </button>
                      </div>
                  ))}
                  <button
                      type="button"
                      onClick={() => arrayHelpers.push({ name: '', age: '' })}
                  >
                      +
                  </button>
              </div>
            )}
          />
        </Col>
        <Col>
          <h3>Items List...</h3>

        </Col>
      </Row>
    </>
  )
};

export default RequestItemsForm;
