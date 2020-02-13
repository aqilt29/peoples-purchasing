import React, { useState, Component } from 'react';
import { AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { BlueButton } from '../../Styles';
import { InputGroupAddon, InputGroupText, InputGroup, Input, Label } from 'reactstrap'
import { listOfUnits } from '../../utils/listOfUnits';
import { listOfLedgers } from '../../utils/listOfLedgers';
import { listOfClassCodes } from '../../utils/listOfClassCodes';

class RequestItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorItemNumber: '',
      vendorPartNumber: '',
      internalPartNumber: '',
      price: 0,
      description: '',
      link: '',
      quantity: 0,
      requestByDate: '',
      isDirect: false,
      unitOfMeasure: '',
      generalLedger: '',
      classCode: '',
    }
  }

  handleChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value
    })
  };

  render() {
    const { classCode, generalLedger, description, requestByDate, price, unitOfMeasure, link } = this.state;
    return (
      <>
        <AvField
          onChange={this.handleChange}
          type="text"
          required
          label="Description:"
          name="description"
          value={description}
          placeholder="Please enter item name/description..."
        />
        <AvField
          required
          onChange={this.handleChange}
          type="date"
          label="Request By Date:"
          value={requestByDate}
          name='requestByDate'
        />
        <InputGroup>
          <div className="mb-2">
            <div>
              <Label>Unit Price:</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <Input
                required
                onChange={this.handleChange}
                pattern='[0-9]{0,5}'
                type="number"
                name="price"
                step="0.01"
                min="0"
                placeholder="420.50"
              />
            </div>
          </div>
        </InputGroup>
        <AvField
          onChange={this.handleChange}
          type="number"
          label="Item Qty:"
          min="1"
          required
          name='quantity'
          placeholder="420"
        />
        <AvField
          onChange={this.handleChange}
          type="select"
          required
          label="Select Pricing Units"
          value={unitOfMeasure}
          name='unitOfMeasure'
        >
          <option value="">Select Unit of Measure...</option>
        {
          listOfUnits.map((unit, idx) => <option key={idx} value={unit}>{unit}</option>)
        }
        </AvField>
        <AvField
          onChange={this.handleChange}
          type="select"
          required
          label="Select General Ledger"
          value={generalLedger}
          name='generalLedger'
        >
          <option value="">Select Relevant Ledger Account...</option>
        {
          listOfLedgers.map((ledger, idx) => <option key={idx} value={ledger}>{ledger}</option>)
        }
        </AvField>
        <AvField
          onChange={this.handleChange}
          type="select"
          required
          label="Select Class Code"
          value={classCode}
          name='classCode'
        >
          <option value="">Select Class Code...</option>
        {
          listOfClassCodes.map((unit, idx) => <option key={idx} value={unit}>{unit}</option>)
        }
        </AvField>
        <AvField
          onChange={this.handleChange}
          type="text"
          label="Item Url (if applicable)"
          value={link}
          name='link'
          placeholder="https://amazon.com/weedplease"
        />
        <AvField
          onChange={this.handleChange}
          type="text"
          label="Vendor Item Number:"
          name="vendorItemNumber"
        />
        <AvField
          onChange={this.handleChange}
          type="text"
          label="Vendor Part Number:"
          name="vendorPartNumber"
        />
        <AvField
          onChange={this.handleChange}
          type="text"
          label="Internal Part Number:"
          name="internalPartNumber"
        />
        <BlueButton onClick={console.log}>Add Item</BlueButton>
      </>
    )
  }
};

export default RequestItems;
