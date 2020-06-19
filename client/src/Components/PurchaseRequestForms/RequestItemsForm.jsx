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
              <h3>Add Items to Purchase</h3>
              <Row>
                <Col>
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
                    onClick={() => arrayHelpers.push({ name: 'wotlf', age: '54' })}
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
