import React, { useState, Component } from 'react';
import { AvField } from 'availity-reactstrap-validation';
import { BlueButton } from '../../Styles';

class RequestItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorItemNumber: '',
      vendorPartNumber: '',
      price: 0,
      description: '',
      link: '',
      internalPartNumber: '',
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

    return (
      <>
        <AvField
          onChange={console.log}
          type="date"
          label="test"
          name='test'
        />
        <BlueButton onClick={console.log}>Add Item</BlueButton>
      </>
    )
  }
};

export default RequestItems;
