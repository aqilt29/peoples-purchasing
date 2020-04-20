import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { BlueButton } from '../../../Styles';
import VendorSelect from '../../VendorSelect';
import UserSelect from '../../UserSelect';
import { listOfPaymentTerms, listOfShippingAddresses } from '../../../utils/lists';
import EntitySelect from '../../EntitySelect';
import { useAuth0 } from '../../../react-auth0-spa';

export const PurchaseReqHeaders = ({ setHeaders, requestToEdit }) => {
  const [vendor, setVendor] = useState(requestToEdit ? requestToEdit.vendor._id : null)
  const [entity, setEntity] = useState(requestToEdit ? requestToEdit.entity._id : null)
  const [user, setUser] = useState(requestToEdit ? requestToEdit.user._id : null)
  const [buyer, setBuyer] = useState(requestToEdit ? requestToEdit.buyer._id : null)

  const [customTerms, setCustomTerms] = useState(null)
  const [isOtherTerms, setIsOtherTerms] = useState(false)

  const [isValid, setValid] = useState(false)
  const { dbUser: { _id: currentUserId } } = useAuth0()

  console.log(currentUserId)
  console.log(entity, vendor, user, '<- from request to edit')

  const submitValidHeaders = (_, { paymentTerms, customTerms, shipTo, businessNeed, isBlanket}) => {
    console.log(entity, vendor, user, buyer, paymentTerms, customTerms)
    setCustomTerms(customTerms)
    if (paymentTerms === 'Other' && customTerms.length < 1) {
      window.alert('Please enter Payment Terms');
      return;
    };

    const reqHeaders = {
      vendor: vendor.value || requestToEdit.vendor._id,
      buyer: buyer.value || requestToEdit.buyer._id,
      entity: entity.value || requestToEdit.entity._id,
      submittedFor: user.value || requestToEdit.submittedFor._id,
      paymentTerms: paymentTerms === 'Other' ? customTerms : paymentTerms,
      shipTo,
      businessNeed,
      isBlanket
    }
    console.log(reqHeaders);

    setHeaders(reqHeaders)
  }


  useEffect(() => {
    if (vendor && user && entity && buyer) setValid(true)
  })

  return (
    <>
      <h5>Purchase Details</h5>
      <Container>
      <AvForm onValidSubmit={submitValidHeaders}>
        <Row>
          <Col>
            <VendorSelect vendorId={requestToEdit ? requestToEdit.vendor._id : undefined} label="Select Vendor for Order:" vendorChange={setVendor} />
            <UserSelect userId={requestToEdit && (requestToEdit.user._id !== currentUserId) ? requestToEdit.user._id : undefined} label="Request on behalf of:" userChange={setUser} />
            <EntitySelect entityId={requestToEdit ? requestToEdit.entity._id : undefined} entityChange={setEntity} />
            <UserSelect userId={requestToEdit && (requestToEdit.buyer._id !== currentUserId) ? requestToEdit.user._id : undefined} label="Person placing the order:" userChange={setBuyer} />
          </Col>
          <Col>
            <AvField
              defaultValue={requestToEdit ? requestToEdit.paymentTerms : undefined}
              type="select"
              required
              onChange={(_, value) => value === 'Other' ? setIsOtherTerms(true) : setIsOtherTerms(false) }
              name="paymentTerms"
              label="Payment Terms:"
              validate={{required: {value: true, errorMessage: 'Please select an option from the list'}}}
            >
              <option value="">Select Payment Terms...</option>
              {
                listOfPaymentTerms.map((term, idx) => <option key={idx} value={term}>{term}</option>)
              }
            </AvField>
            <AvField
              labelHidden={ isOtherTerms ? false : true }
              style={{ visibility: isOtherTerms ? 'visible' : 'hidden' }}
              defaultValue={requestToEdit ? requestToEdit.paymentTerms : undefined}
              name="customTerms"
              label="Custom Payment Terms:"
              type="text"
              placeholder="Enter Custom Terms if Applicable"
            />
            <AvField
              defaultValue={requestToEdit ? requestToEdit.address.shipTo : undefined}
              type="select"
              required
              name="shipTo"
              label="Delivery Address:"
              validate={{required: {value: true, errorMessage: 'Please select an option from the list'}}}
            >
              <option value="">Select Delivery Address Terms...</option>
              {
                listOfShippingAddresses.map((address, idx) => <option key={idx} value={address}>{address}</option>)
              }
            </AvField>
            <AvField
              defaultValue={requestToEdit ? requestToEdit.businessNeed : undefined}
              required
              type="textarea"
              name="businessNeed"
              label="Describe Business Justification:"
              placeholder="Please describe purchasing need..."
            />
            <div className="my-3">
              <AvGroup check>
                <Label check>
                  <AvInput
                    type="checkbox"
                    name="isBlanket"
                    trueValue={true}
                    falseValue={false}
                  />
                  Is a blanket PR?
                </Label>
              </AvGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <BlueButton disabled={!isValid}>Next</BlueButton>
        </Row>
      </AvForm>
      </Container>
    </>
  )
};

