import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BlueButton } from '../Styles';
import PurchaseForm from '../Components/PurchaseForm';
import { getVendorList } from '../api/vendorApi';
import { getApprovedSigners, getAllUsers } from '../api/userApi';
import Loading from '../Components/Loading';
import { listOfEntities } from '../utils/listOfEntities';

class PurchasingCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfVendors: [],
      listOfApprovingUsers: [],
      listOfUsers: [],
      vendor: '',
      shipTo: '',
      billTo: '',
      submittedFor: '',
      businessUnit: '',
      entity:'',
      entityIndex:'',
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
      isLoading: false,
    }

  }

  componentDidMount() {
    const { listOfApprovingUsers, listOfUsers, listOfVendors } = this.state;
    // check to see if there are entries in the state and call the apis accordingly
    if (listOfApprovingUsers.length < 1) this.getApprovingUsers();
    if (listOfUsers.length < 1) this.getListOfUsers();
    if (listOfVendors.length < 1) this.getListOfVendors();
  };

  submitNewForm = (e) => {
    console.log(e, 'submitted')
  }

  getApprovingUsers = async () => {
    let data;

    this.setState({isLoading: true}, async () => {
      try {
        data = await getApprovedSigners()
      } catch (error) {
        window.alert(error)
      }
      this.setState({
        listOfApprovingUsers: data
      }, () => {
        this.setState({isLoading: false})
        console.table(data)
      })
    })

  };

  getListOfUsers = async () => {
    let data;

    this.setState({isLoading: true}, async () => {
      try {
        data = await getAllUsers()
      } catch (error) {
        window.alert(error)
      }
      this.setState({
        listOfUsers: data
      }, () => {
        this.setState({isLoading: false})
        console.table(data)
      })
    })
  };

  getListOfVendors = async () => {
    let data;
    this.setState({isLoading: true}, async () => {
      try {
        data = await getVendorList()
      } catch (error) {
        window.alert(error)
      }
      this.setState({
        listOfVendors: data
      }, () => {
        this.setState({isLoading: false})
        console.table(data)
      })
    })
  };

  getTotalProgress = () => {
    return (this.state.currentStep/4) * 100;
  };

  incrementStep = (e) => {
    e.preventDefault();
    let { currentStep } = this.state;
    if (currentStep > 2) return
    console.log(currentStep)
    this.setState({
      currentStep: currentStep += 1,
    })
  };

  decrementStep = (e) => {
    e.preventDefault();
    let { currentStep } = this.state;
    if (currentStep === 0) return
    console.log(currentStep)
    this.setState({
      currentStep: currentStep -= 1,
    })
  };

  handleChange = (e) => {
    const { target: { name, value } } = e;

    console.log('out of entity', value)
    this.setState({
      [name]: value
    })
  };

  handleEntityChange = (e) => {
    const { target: { value } } = e;

    this.setState({
      entityIndex: value,
      entity: listOfEntities[value].name,
      billTo: listOfEntities[value].billTo,
      businessUnit: listOfEntities[value].businessUnit,
    })

  };

  addItem = (item) => {
    // const { ...items } = this.state;

    this.setState(({ items }) => {
      return { items: [item, ...items]}
    })
  };

  render () {
    const { history, user } = this.props;
    const { isLoading, currentStep, ...rest } = this.state;
    console.log(user)

    if (isLoading) return <Loading />

    return (
      <>
       <h3>Create Purchase Requisition</h3>
       <Container>
         <Row>
           <Col className="text-center">
            <h4>Form Entry</h4>
            <PurchaseForm
              handleChange={this.handleChange}
              handleEntityChange={this.handleEntityChange}
              currentStep={currentStep}
              incrementStep={this.incrementStep}
              decrementStep={this.decrementStep}
              submitNewForm={this.submitNewForm}
              addItem={this.addItem}
              {...rest}
            />
           </Col>
         </Row>
         <br />
         <BlueButton onClick={() => history.goBack()}>Go back</BlueButton>
       </Container>
      </>
    )
  }
}

export default PurchasingCreateForm;
