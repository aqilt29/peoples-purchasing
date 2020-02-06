import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';

class UserCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      auth0Id: '',
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

  render() {
    return (
      <div>Hello Form</div>
    )
  }

}

export default UserCreation;
