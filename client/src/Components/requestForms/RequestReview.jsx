import React from 'react';
import { Col, Row } from 'reactstrap';
import ItemList from './ItemList';
import { GoldButton } from '../../Styles';

const RequestReview = ({ submitNewForm, ...props}) => {
  console.log(props.listOfVendors)

  const findNameById = (list, _id, type) => {
    return list.find(item => item._id === _id)[type]
  }

  return (
    <>
      <h6>Review Submission</h6>
      <Row className="my-3">
        <Col>
          <h6>Vendor:</h6>
          <p>{findNameById(props.listOfVendors, props.vendor, 'name')}</p>
          <h6>Ship To Address:</h6>
          <p>{props.shipTo}</p>
          <h6>Submitted on Behalf of:</h6>
          <p>{findNameById(props.listOfUsers, props.submittedFor, 'email')}</p>
          <h6>Business Justification:</h6>
          <p>{props.businessNeed}</p>
        </Col>
        <Col>
          <h6>Buyer Submitting order:</h6>
          <p>{findNameById(props.listOfUsers, props.buyer, 'email')}</p>
          <h6>Invoice Total Estimate:</h6>
          <p>${props.invoiceTotal}</p>
          <h6>Payment Terms:</h6>
          <p>{props.paymentTerms}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6>Items on List</h6>
          <ItemList items={props.items} deleteItem={() => {}}/>
        </Col>
      </Row>
      <Row>
      <Col sm="12" md={{ size: 6, offset: 4 }}>
        <GoldButton onClick={submitNewForm}>Submit Purchase Requisition</GoldButton>
      </Col>
      </Row>
    </>
  )
};

export default RequestReview;
