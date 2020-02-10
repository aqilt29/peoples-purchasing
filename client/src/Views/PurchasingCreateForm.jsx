import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BlueButton } from '../Styles';
import PurchaseForm from '../Components/PurchaseForm';
import { getVendorList } from '../api/vendorApi';
import { getApprovedSigners, getAllUsers } from '../api/userApi';

class PurchasingCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfVendors: [],
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

  componentDidMount() {
    const { listOfApprovingUsers, listOfUsers, listOfVendors } = this.state;
    // check to see if there are entries in the state and call the apis accordingly
    if (listOfApprovingUsers.length < 1) this.getApprovingUsers();
    if (listOfUsers.length < 1) this.getListOfUsers();
    if (listOfVendors.length < 1) this.getListOfVendors();
  };

  getApprovingUsers = async () => {
    let data;
    try {
      data = await getApprovedSigners()
    } catch (error) {
      window.alert(error)
    }
    this.setState({
      listOfApprovingUsers: data
    })
    console.table(data)
  };

  getListOfUsers = async () => {
    let data;
    try {
      data = await getAllUsers()
    } catch (error) {
      window.alert(error)
    }
    this.setState({
      listOfVendors: data
    })
    console.table(data)
  };

  getListOfVendors = async () => {
    let data;
    try {
      data = await getVendorList()
    } catch (error) {
      window.alert(error)
    }
    this.setState({
      listOfApprovingUsers: data
    })
    console.table(data)
  };

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
