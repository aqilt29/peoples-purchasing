import React from 'react';
import { AvField } from 'availity-reactstrap-validation'

const RequestHeaders = ({ listOfVendors, handleChange }) => {
  console.log(listOfVendors)
  return (
    <>
      <h6>Headers</h6>
      <AvField onChange={(e) => handleChange(e)} type="select" name="vendor" label="Vendor:" helpMessage="Please select which vendor to issue PO..." validate={{required: {value: true, errorMessage: 'Please select a vendor from the list'}}}>
        <option value="">Select A Vendor...</option>
        {
          listOfVendors.map((vendor) => <option>{vendor.name}</option>)
        }
      </AvField>
    </>
  )
};

export default RequestHeaders;
