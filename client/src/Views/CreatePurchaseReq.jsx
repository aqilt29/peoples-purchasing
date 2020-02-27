import React, { Component } from 'react';
import { PurchaseReqHeaders } from '../Components/requestForms/CreatePurchaseReq';


class CreatePurchaseReq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      address: {},

    }
  }

  componentDidMount() {
    //  fetch all the useful db arrays here??
  }


  render() {
    const { step } = this.state
    return (
      <>
        <h3>Create New Purchase Requisition</h3>
        {
          step === 0 ? <PurchaseReqHeaders /> : null
        }
      </>
    )
  }
}

export default CreatePurchaseReq;
