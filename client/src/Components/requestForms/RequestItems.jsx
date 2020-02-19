import React, { useState, useRef } from 'react';
import { AvField, AvGroup, AvInput, AvForm } from 'availity-reactstrap-validation';
import { BlueButton } from '../../Styles';
import { InputGroupAddon, InputGroupText, InputGroup, Input, Label } from 'reactstrap'
import { listOfUnits, listOfLedgers, listOfClassCodes } from '../../utils/lists';

const RequestItems = ({ addItem, incrementStep }) => {
  const formRef = useRef(null)

  const handleAddItem = (_, { price, quantity, ...rest }) => {
    const itemToAdd = {
      price: parseFloat(price),
      quantity: parseFloat(quantity),
      ...rest
    }
    addItem(itemToAdd)
    formRef.current.reset()
  }

  return (
    <>
      <AvForm onValidSubmit={handleAddItem} ref={formRef}>
        <AvField
          type="text"
          required
          label="Description:"
          name="description"
          placeholder="Please enter item name/description..."
        />
        <AvField
          required
          type="date"
          label="Request By Date:"
          name='requestByDate'
        />
        <AvGroup>
          <div className="mb-2">
            <div>
              <Label>Unit Price:</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <AvInput
                required
                pattern='[0-9]{0,5}'
                type="number"
                name="price"
                min={0}
                placeholder="420.50"
              />
            </div>
          </div>
        </AvGroup>
        <AvField
          type="number"
          label="Item Qty:"
          min="1"
          required
          name='quantity'
          placeholder="420"
        />
        <AvField
          type="select"
          required
          label="Select Pricing Units"
          name='unitOfMeasure'
        >
          <option value="">Select Unit of Measure...</option>
        {
          listOfUnits.map(({ name, value }, idx) => <option key={idx} value={value}>{name}</option>)
        }
        </AvField>
        <AvField
          type="select"
          required
          label="Select General Ledger"
          name='generalLedger'
        >
          <option value="">Select Relevant Ledger Account...</option>
        {
          listOfLedgers.map((ledger, idx) => <option key={idx} value={ledger}>{ledger}</option>)
        }
        </AvField>
        <AvField
          type="select"
          required
          label="Select Class Code"
          name='classCode'
        >
          <option value="">Select Class Code...</option>
        {
          listOfClassCodes.map((unit, idx) => <option key={idx} value={unit}>{unit}</option>)
        }
        </AvField>
        <AvField
          type="text"
          label="Item Url (if applicable)"
          name='link'
          placeholder="https://amazon.com/weedplease"
        />
        <AvField
          type="text"
          label="Vendor Item Number:"
          name="vendorItemNumber"
        />
        <AvField
          type="text"
          label="Vendor Part Number:"
          name="vendorPartNumber"
        />
        <AvField
          type="text"
          label="Internal Part Number:"
          name="internalPartNumber"
        />
        <div className="my-3">
          <AvGroup check>
            <Label check>
              <AvInput
                type="checkbox"
                name="isDirect"
                trueValue={true}
                falseValue={false}
              />
              Item is a direct material?
            </Label>
          </AvGroup>
        </div>
        <div className="my-3">
          <BlueButton>Add Item</BlueButton>
        </div>
      </AvForm>
      <BlueButton onClick={incrementStep}>Next</BlueButton> {" "}
    </>
  )
}

export default RequestItems;
