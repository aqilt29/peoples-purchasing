import React from 'react';
import { AvField, AvInput } from 'availity-reactstrap-validation'

const RequestHeaders = ({ listOfEntities, listOfVendors, handleChange, listOfUsers }) => {
  // console.log(listOfEntities)
  return (
    <>
      <h6>Headers</h6>
      <AvField
        onChange={(e) => handleChange(e)}
        type="select"
        name="vendor"
        label="Vendor:"
        helpMessage="Please select which vendor to issue PO..."
        validate={{required: {value: true, errorMessage: 'Please select a vendor from the list'}}}
      >
        <option value="">Select A Vendor...</option>
        {
          listOfVendors.map((vendor) => <option value={vendor._id}>{vendor.name}</option>)
        }
      </AvField>
      <AvField
        onChange={(e) => handleChange(e)}
        type="select"
        name="entity"
        label="Entity Responsible:"
        helpMessage="Please select which vendor to issue PO..."
        validate={{required: {value: true, errorMessage: 'Please select a vendor from the list'}}}
      >
        <option value="">Select a Business Unit...</option>
        {
          listOfEntities.map((entity) => <option value={entity}>{entity}</option>)
        }
      </AvField>
      <AvField
        onChange={(e) => handleChange(e)}
        required
        type="text"
        name="paymentTerms"
        label="Payment Terms:"
        placeholder="Net 30/ Credit Card, etc..."
      />
      <AvField
        onChange={(e) => handleChange(e)}
        required
        type="textarea"
        name="shipTo"
        label="Delivery Address:"
        helpMessage="Please enter in the address for receiving..."
      />
      <AvField
        onChange={(e) => handleChange(e)}
        required
        type="textarea"
        name="billTo"
        label="Billing Address:"
        helpMessage="Please enter in the address for billing..."
      />
      <AvField
        onChange={(e) => handleChange(e)}
        required
        type="textarea"
        name="businessNeed"
        label="Describe Business Usage:"
        helpMessage="Please describe purchasing need..."
      />
      <AvField
        onChange={(e) => handleChange(e)}
        type="select"
        name="buyer"
        label="Employee Placing the Order"
      >
        <option value="">Select A User...</option>
        {
          listOfUsers.map((user) => <option value={user.email}>{user.firstName} {user.lastName}</option>)
        }
      </AvField>
      <AvField
        onChange={(e) => handleChange(e)}
        type="select"
        name="submittedFor"
        label="Request on behalf of:"
        helpMessage="Select if you're submitting this on behalf of anyone else..."
      >
        <option value="">Optional: Select A User...</option>
        {
          listOfUsers.map((user) => <option value={user.email}>{user.firstName} {user.lastName}</option>)
        }
      </AvField>
    </>
  )
};

export default RequestHeaders;
