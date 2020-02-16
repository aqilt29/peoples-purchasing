import React from 'react';
import { Col, Row } from 'reactstrap';
import ItemList from './ItemList';

const RequestReview = (props) => {
  const findVendorName = (vendorList) => {
    return vendorList.find(vendor => vendor._id === props.vendor).name
  }

  return (
    <>
      <h6>Review Submission</h6>
      <Row className="my-3">
        <Col>
          <h6>Vendor:</h6>
          <p>{findVendorName(props.listOfVendors)}</p>
          <h6>Ship To Address:</h6>
          <p>{props.shipTo}</p>
          <h6>Submitted on Behalf of:</h6>
          <p>{props.submittedFor}</p>
          <h6>Business Justification:</h6>
          <p>{props.businessNeed}</p>
        </Col>
        <Col>
          <h6>Buyer Submitting order:</h6>
          <p>{props.buyer}</p>
          <h6>Submitted on Behalf of:</h6>
          <p>{props.submittedFor}</p>
          <h6>Invoice Total Estimate:</h6>
          <p>{props.invoiceTotal}</p>
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
    </>
  )
};

export default RequestReview;
