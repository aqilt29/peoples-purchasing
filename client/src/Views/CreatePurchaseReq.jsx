import React, { Component } from 'react';

class CreatePurchaseReq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      address: {},

    }
  }

  componentDidMount() {
    //  fetch all the useful db arrays here
  }


  render() {
    return (
      <>
        <h3>Create New Purchase Requisition</h3>
      </>
    )
  }
}

export default CreatePurchaseReq;
