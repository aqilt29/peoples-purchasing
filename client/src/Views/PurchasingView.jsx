import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../Components/requestForms/ItemList'
import { format } from 'date-fns';

import Loading from '../Components/Loading';
import { getRequestById } from '../api/requestApi';
import { Container, Row, Col } from 'reactstrap';

const PurchasingView = () => {
  const { id } = useParams();

  const [isLoading, setLoading] = useState(false);
  const [requestData, setData] = useState(false)

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      let data;

      try {
        data = await getRequestById(id);
        setData(data.data);

      } catch (error) {
        setLoading(false);
        window.alert(error)
      }

      setLoading(false);
    }

    fn()
  }, [])

  if (isLoading || !requestData) return <Loading />


  return (
    <>
      <h3>Purchase Request Details</h3>
      <Container>
        <Row>
        <Col>
          <h6>Vendor:</h6>
          <p>Name: {requestData.vendor.name}</p>
          <p>Address: {requestData.vendor.address}</p>
          <h6>Ship To Address:</h6>
          <p>{requestData.address.shipTo}</p>
          <h6>Submitted on Behalf of:</h6>
          <p>{requestData.submittedFor.firstName} {requestData.submittedFor.lastName}</p>
          <h6>Business Justification:</h6>
          <p>{requestData.businessNeed}</p>
        </Col>
        <Col>
          <h6>Buyer Submitting order:</h6>
          <p>{requestData.user}</p>
          <h6>Invoice Total Estimate:</h6>
          <p>${requestData.invoiceTotal}</p>
          <h6>Payment Terms:</h6>
          <p>{requestData.paymentTerms}</p>
          <h6>Date Requested:</h6>
          <p>{format(new Date(requestData.dateRequested), 'MM/dd/yyyy')}</p>
        </Col>
        </Row>
        <hr />
        <Row>
        <Col>
          <h6>Items on List</h6>
          <ItemList items={requestData.items} deleteItem={() => {}}/>
        </Col>
      </Row>
      </Container>
    </>
  )
};

export default PurchasingView;
