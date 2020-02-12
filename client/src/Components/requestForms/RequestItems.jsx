import React from 'react';
import { AvField } from 'availity-reactstrap-validation';

const RequestItems = ({ handleChange }) => {
  return (
    <>
      <h6>Items</h6>
      <AvField
        onChange={(e) => handleChange(e)}
        type="text"
        label="test"
        name='test'
      />
    </>
  )
};

export default RequestItems;
