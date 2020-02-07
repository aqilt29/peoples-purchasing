import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BlueButton } from '../Styles';
import VendorForm from '../Components/VendorForm';

class ManageVendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfVendors: [],
    }

  }


  render () {
    const { history } = this.props;

    return (
      <>
       <h3>Add a New Vendor to the List</h3>
       <Container>
         <Row>
           <Col className="text-center">
             <h4>Vendor Form Entry</h4>
             <br />
             <VendorForm />
           </Col>
         </Row>
         <br />
       </Container>
      </>
    )
  }
}

export default ManageVendors;
