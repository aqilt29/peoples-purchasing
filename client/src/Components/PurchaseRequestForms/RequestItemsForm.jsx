import React from 'react';
import { Field } from 'formik';

const RequestItemsForm = () => {
  return (
    <>
      <h3>Add Items to Purchase</h3>
      <Field
        type="input"
        name="hello"
      />
    </>
  )
};

export default RequestItemsForm;
