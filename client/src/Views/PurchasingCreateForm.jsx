import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BlueButton } from '../Styles';
import PurchaseForm from '../Components/PurchaseForm';

class PurchasingCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfVendors: [],
      listOfEntities: [],
      listOfApprovingUsers: [],
      listOfUsers: [],
      vendor: {},
      shipTo: '',
      billTo: '',
      submittedFor: '',
      entity:'',
      businessNeed: '',
      invoiceTotal: 0,
      approverList: [],
      paymentTerms: '',
      comments: '',
      buyer: '',
      shipVia: '',
      shippingTerms: '',
      items: [],
      currentStep: 0,
    }

  }

  getTotalProgress = () => {
    return (this.state.currentStep/4) * 100;
  };

  incrementStep = (e) => {
    e.preventDefault();
    let { currentStep } = this.state;
    console.log(currentStep)
    this.setState({
      currentStep: currentStep += 1,
    })
  };

  render () {
    const { history } = this.props;

    return (
      <>
       <h3>Create Purchase Requisition</h3>
       <Container>
         <Row>
           <Col className="text-center">
             <h4>Form Entry</h4>
             <br />
             <PurchaseForm totalProgress={this.getTotalProgress()}/>
           </Col>
         </Row>
         <br />
         <BlueButton onClick={(e) => this.incrementStep(e)}>Increment Step</BlueButton>
         <BlueButton onClick={() => history.goBack()}>Go back</BlueButton>
       </Container>
      </>
    )
  }
}

export default PurchasingCreateForm;
