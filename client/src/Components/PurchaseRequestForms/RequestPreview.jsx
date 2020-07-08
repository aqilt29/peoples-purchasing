import React from 'react';
import { useFormikContext } from 'formik';
import { Container, Row, Col } from 'reactstrap';
import { ItemsCart } from '.';
import _ from 'lodash';

const RequestPreview = ({ entitiesList }) => {
  const { values, ...rest } = useFormikContext()
  // console.log(values, entitiesList)
  return (
    <>
      <Container>
        <Row>
          <Col><h3>Request Preview</h3></Col>
        </Row>
        <hr />
        <Row>
          <Col md={3}><h6>Reference/Project Name:</h6></Col>
          <Col md={3}><p>{values.referenceName}</p></Col>
          <Col md={3}><h6>Purchasing Entity:</h6></Col>
          <Col md={3}><p>{_.find(entitiesList, { _id: values.entity }).name}</p></Col>
        </Row>
        <Row>
          <Col md={3}><h6>Business Need/ Details:</h6></Col>
          <Col md={3}><p>{values.businessNeed}</p></Col>
          <Col md={3}><h6>Invoice Total:</h6></Col>
          <Col md={3}><p>${values.items.reduce((acc, curr) => acc += (curr.price * curr.quantity), 0)}</p></Col>
          <Col md={6}>
            <h6>Shipping Address:</h6>
            <Row>
              <Col>
                Address:
              </Col>
              <Col>
                {values.shippingAddress.address}
              </Col>
            </Row>
            <Row>
              <Col>
                Address 2:
              </Col>
              <Col>
                {values.shippingAddress.address2 || ''}
              </Col>
            </Row>
            <Row>
              <Col>
                City:
              </Col>
              <Col>
                {values.shippingAddress.city}
              </Col>
            </Row>
            <Row>
              <Col>
                State:
              </Col>
              <Col>
                {values.shippingAddress.state}
              </Col>
            </Row>
            <Row>
              <Col>
                Zip:
              </Col>
              <Col>
                {values.shippingAddress.zipCode}
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row>
        <Col>
          <h3>Request Items List</h3>
          <ItemsCart items={values.items} details />
        </Col>
        </Row>
      </Container>
    </>
  )
};

export default RequestPreview;
