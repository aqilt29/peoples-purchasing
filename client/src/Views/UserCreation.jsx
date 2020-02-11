import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import CreateUserForm from "../Components/CreateUserForm";
import { useAuth0 } from '../react-auth0-spa';

class UserCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      firstName: '',
      lastName: '',
      auth0Id: this.props.user.sub,
      entity: '',
      role: '',
    }

    this.roleTypes = [
      'Employee',
      'Manager',
      'Admin',
      'Director',
    ]

    this.listOfEntities = [
      'Hero Oak',
      'Lean Green',
      'Monterey Ocean Grown',
      'Monterey Valley Pride',
      'New Patriot Holdings',
      'Oxford Properties',
      'People\'s Aviation',
      'People\'s First Choice',
      'People\'s LA',
      'People\'s Marketing Group',
      'People\'s Riverside',
      'People\'s WeHo',
      'Standard Hemp',
      'Standard Farming'
    ];
  }

  handleUserSubmission = () => {};

  handleInputChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value
    })
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h3>Create User...</h3>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm="3">
            <h4>Info:</h4>
            <p>Please enter/validate your employee related information into the form on the right</p>
            <p>If you need assistance or have any questions, please reach out to IT</p>
            <a href="mailto:Aqil@pmcoc.com">Email IT here</a>
          </Col>
          <Col>
            <h4>Form:</h4>
            <CreateUserForm
              handleInputChange={this.handleInputChange}
              entities={this.listOfEntities}
              roleTypes={this.roleTypes}
            />
          </Col>
        </Row>
      </Container>
    )
  }

}

export default UserCreation;
