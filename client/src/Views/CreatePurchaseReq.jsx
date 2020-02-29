import React, { Component } from 'react';
import { PurchaseReqHeaders, AddItemsForm, ReqSummary } from '../Components/requestForms/CreatePurchaseReq';
import { createNewRequest } from '../api/requestApi';
import Loading from '../Components/Loading';

class CreatePurchaseReq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      items: this.props.requestToEdit ? this.props.requestToEdit.items : [],
      invoiceTotal: this.props.requestToEdit ? this.props.requestToEdit.invoiceTotal : 0,
      vendor: this.props.requestToEdit ? this.props.requestToEdit.vendor._id : '',
      entity: this.props.requestToEdit ? this.props.requestToEdit.entity._id : '',
      submittedFor: this.props.requestToEdit ? this.props.requestToEdit.submittedFor._id : '',
      buyer: this.props.requestToEdit ? this.props.requestToEdit.buyer: '',
      paymentTerms: this.props.requestToEdit ? this.props.requestToEdit.paymentTerms : '',
      shipTo: this.props.requestToEdit ? this.props.requestToEdit.address.shipTo : '',
      businessNeed: this.props.requestToEdit ? this.props.requestToEdit.businessNeed : '',
      isLoading: false,
      successData: null,
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

  incrementStep = (e) => {
    e.preventDefault();
    console.log('clicked')
    let { step } = this.state;
    if (step > 2) return
    console.log(step)
    this.setState({
      step: step += 1,
    })
  }

  decrementStep = (e) => {
    e.preventDefault();
    let { step } = this.state;
    if (step === 0) return
    console.log(step)
    this.setState({
      step: step -= 1,
    })
  };

  submitNewForm = async (e) => {
    console.log(e, 'submitted', this.props.user._id)
    const postData = { user: this.props.user._id, ...this.state}
    let data;

    this.setState({ isLoading: true }, async () => {
      try {
        data = await createNewRequest(postData)
      } catch (error) {
        window.alert(error)
      }
      this.setState({
        isLoading: false,
        step: 2,
        successData: data.data,
      }, () => {
        console.table(data.data)
      })
    })
  }

  render() {
    console.log(this.props)
    const { step, items, isLoading } = this.state
    const { requestToEdit = undefined } = this.props

    if (isLoading) return <Loading />;

    return (
      <>
        <h3>Purchase Requisition</h3>
        {
          step === 0 ? <PurchaseReqHeaders
            requestToEdit={requestToEdit}
            setHeaders={this.setHeaders}
          /> : null
        }
        {
          step === 1 ? <AddItemsForm
            requestToEdit={requestToEdit}
            submitNewForm={this.submitNewForm}
            items={items}
            addItem={this.addItem}
            deleteItem={this.deleteItem}
          /> : null
        }
        {
          step === 2 ? <ReqSummary
            requestToEdit={requestToEdit}
            decrementStep={this.decrementStep}
            {...this.state}
          /> : null
        }
      </>
    )
  }
}

export default CreatePurchaseReq;
