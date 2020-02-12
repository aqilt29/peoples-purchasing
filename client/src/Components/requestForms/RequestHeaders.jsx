import React from 'react';
import { AvField, AvInput } from 'availity-reactstrap-validation'
import { listOfEntities } from '../../utils/listOfEntities';
import { listOfPaymentTerms } from '../../utils/listOfPaymentTerms';

const RequestHeaders = ({ listOfVendors, handleChange, listOfUsers }) => {

  return (
    <>
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
        label="Entity Billed:"
        validate={{required: {value: true, errorMessage: 'Please select an entity from the list the request is for'}}}
      >
        <option value="">Select a Business Entity...</option>
        {
          listOfEntities.map((entity) => <option value={JSON.stringify(entity)}>{entity.name}</option>)
        }
      </AvField>
      <AvField
        onChange={(e) => handleChange(e)}
        type="select"
        required
        name="paymentTerms"
        label="Payment Terms:"
        validate={{required: {value: true, errorMessage: 'Please select an option from the list'}}}
      >
        <option value="">Select Payment Terms...</option>
        {
          listOfPaymentTerms.map((term) => <option value={term}>{term}</option>)
        }
      </AvField>
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
        value='hello'
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
        label="Describe Business Need:"
        helpMessage="Please describe purchasing need..."
      />
    </>
  )
};

export default RequestHeaders;
