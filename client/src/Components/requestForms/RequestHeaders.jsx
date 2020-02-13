import React from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation'
import { listOfEntities } from '../../utils/listOfEntities';
import { listOfPaymentTerms } from '../../utils/listOfPaymentTerms';
import { listOfShippingAddresses } from '../../utils/listOfShippingAddresses';
import { BlueButton } from '../../Styles'

const RequestHeaders = ({ handleEntityChange, listOfVendors, handleChange, listOfUsers, ...props }) => {

  return (
    <>
    <AvForm onValidSubmit={props.incrementStep}>
        <AvField
          onChange={(e) => handleChange(e)}
          type="select"
          value={props.submittedFor}
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
          value={props.buyer}
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
          value={props.vendor}
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
          onChange={(e) => handleEntityChange(e)}
          type="select"
          name="entity"
          value={props.entityIndex}
          label="Entity Billed:"
          validate={{required: {value: true, errorMessage: 'Please select an entity from the list the request is for'}}}
        >
          <option value="">Select a Business Entity...</option>
          {
            listOfEntities.map((entity, index) => <option key={index} value={index}>{entity.name}</option>)
          }
        </AvField>
        <AvField
          onChange={(e) => handleChange(e)}
          type="select"
          required
          value={props.paymentTerms}
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
          type="select"
          required
          value={props.shipTo}
          name="shipTo"
          label="Delivery Address:"
          validate={{required: {value: true, errorMessage: 'Please select an option from the list'}}}
        >
          <option value="">Select Delivery Address Terms...</option>
          {
            listOfShippingAddresses.map((address) => <option value={address}>{address}</option>)
          }
        </AvField>
        <AvField
          onChange={(e) => handleChange(e)}
          required
          type="textarea"
          value={props.businessNeed}
          name="businessNeed"
          label="Describe Business Justification:"
          helpMessage="Please describe purchasing need..."
        />
        <BlueButton>Next...</BlueButton>
    </AvForm>
    </>
  )
};

export default RequestHeaders;
