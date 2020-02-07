import React from 'react';
import { Link, Route } from 'react-router-dom';
import { BlueButton } from '../Styles';
import { Container, Row, Col } from 'reactstrap';

const Purchasing = () => {
  return (
    <>
      <h3>Purchasing</h3>
      <Container>
        <Row>
          <Col sm={6}>
            <h5>Actions</h5>
            <Row>
              <BlueButton tag={Link} to="purchasing/createform">
                Submit Purchase Requisition Form
              </BlueButton>
            </Row>
            <br />
            <Row>
              <BlueButton tag={Link} to="purchasing/viewforms">
                View OutStanding Forms
              </BlueButton>
            </Row>
            <br />
            <Row>
              <BlueButton tag={Link} to="purchasing/vendorlist">
                View & Manage Vendor List
              </BlueButton>
            </Row>
          </Col>
          <Col sm={6}>
            <h5>OutStanding Purchases</h5>
            <div style={{ height: '50vh', border: '3px solid black'}} />
          </Col>
        </Row>
      </Container>
      <br />
      <Link to='/'>
        <BlueButton>
          Go Back
        </BlueButton>
      </Link>
    </>
  )
};

export default Purchasing;