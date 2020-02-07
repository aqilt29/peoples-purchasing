import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BlueButton } from '../Styles';
import VendorForm from '../Components/VendorForm';

class ManageVendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfVendors: [],
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      website: '',
      hasW9: false,
      attn: '',
      formIsValid: false,
    }
  }

  setValid = () => {
    const { formIsValid } = this.state;
    this.setState({
      formIsValid: !formIsValid
    })
  };

  getAllVendors = () => {};

  submitForm = () => {};

  handleInput = (e) => {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value
    })
  };

  componentDidMount() {

  }


  render () {
    const { history } = this.props;
    const { formIsValid } = this.state;

    return (
      <>
       <h3>Add a New Vendor</h3>
       <Container>
         <Row>
           <Col className="text-center">
             <h4>Entry Form</h4>
             <br />
             <VendorForm setValid={this.setValid} formIsValid={formIsValid} handleInput={this.handleInput} />
           </Col>
           <Col sm={6}>
            <h5>Vendor List</h5>
            <div style={{ height: '50vh', border: '3px solid black'}} />
          </Col>
         </Row>
         <br />
         <BlueButton onClick={this.setValid}>Set Valid</BlueButton>
         <BlueButton onClick={() => history.goBack()}>Go back</BlueButton>
       </Container>
      </>
    )
  }
}

export default ManageVendors;
