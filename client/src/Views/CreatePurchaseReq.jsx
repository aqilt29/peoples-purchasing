import React, { Component } from 'react';
import { PurchaseReqHeaders, AddItemsForm } from '../Components/requestForms/CreatePurchaseReq';


class CreatePurchaseReq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      address: {},
      items: [],
      invoiceTotal: 0,
    }
  }

  setHeaders = (reqHeaders) => {
    this.setState((prevState) => {
      return {
        ...reqHeaders,
        step: prevState.step += 1
      }
    }, () => { console.log(this.state)})

  };

  addItem = (item) => {
    this.setState(({ items, invoiceTotal }) => {
      return {
        items: [...items, item],
        invoiceTotal: invoiceTotal += (item.price * item.quantity)
      }
    }, () => {
      console.log(this.state.items, this.state.invoiceTotal)
    })
  };

  deleteItem = (index) => {
    this.setState(({ items, invoiceTotal }) => {
      const [ itemDeleted ] = items.splice(index, 1)
      return {
        items: [...items],
        invoiceTotal: invoiceTotal -= (itemDeleted.price * itemDeleted.quantity)
      }
    }, () => {
      console.log(this.state.items, this.state.invoiceTotal)
    })
  };


  render() {
    const { step, items } = this.state
    return (
      <>
        <h3>Create New Purchase Requisition</h3>
        {
          step === 0 ? <PurchaseReqHeaders setHeaders={this.setHeaders} /> : null
        }
        {
          step === 1 ? <AddItemsForm items={items} addItem={this.addItem} deleteItem={this.deleteItem} /> : null
        }
      </>
    )
  }
}

export default CreatePurchaseReq;
