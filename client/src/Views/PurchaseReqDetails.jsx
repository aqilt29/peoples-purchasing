import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getRequestById } from '../api/requestApi';
import Loading from '../Components/Loading';
import { Container, Col, Row } from 'reactstrap'
import { SmallP } from '../Styles';
import { format } from 'date-fns'

const PurchaseReqDetails = (props) => {
  const { params: { id } } = useRouteMatch();
  const [request, setRequest] = useState(null);
  const [isLoading, setLoading] = useState(false);


  console.log(id)
  console.log(props)
  console.log(request)
  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      let data;

      try {
        data = await getRequestById(id);
        console.log(data)
        setRequest(data.data);
      } catch (error) {
        setLoading(false);
        window.alert(error)
      }
      setLoading(false);
    }

    if (!request) {
      fn()
    }
  }, [])

  if (isLoading || !request) return <Loading />

  return (
    <>
      <h3>Requisition Details</h3>
      <h4>Id: {id.slice(-5).toUpperCase()}</h4>
      <Container>
        <Row>
          {/* row for header details */}
          <Col>
            <Row>
              <Col><strong>Date Requested:</strong></Col>
              <Col><SmallP>{format(new Date(request.dateRequested), 'MM/dd/yyyy')}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>User Submitted:</strong></Col>
              <Col><SmallP>{`${request.user.firstName} ${request.user.lastName}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>User Email:</strong></Col>
              <Col><SmallP>{`${request.user.email}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Submitted on Behalf Of:</strong></Col>
              <Col><SmallP>{`${request.submittedFor.firstName} ${request.submittedFor.lastName}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Requested Delivery Address:</strong></Col>
              <Col><SmallP>{`${request.address.shipTo}`}</SmallP></Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col><strong>Entity Billed:</strong></Col>
              <Col><SmallP>{`${request.entity.name}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Business Unit:</strong></Col>
              <Col><SmallP>{`${request.entity.businessUnit}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Buyer Submitting Order:</strong></Col>
              <Col><SmallP>{`${request.buyer}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Invoice Total Amount:</strong></Col>
              <Col><SmallP>{`$${request.invoiceTotal}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Payment Terms:</strong></Col>
              <Col><SmallP>{`${request.paymentTerms}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Business Justification:</strong></Col>
              <Col><SmallP>{`${request.businessNeed}`}</SmallP></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          {/* row for uploading and information on that */}

        </Row>
        <Row>
          {/* row for approval information */}
        </Row>
      </Container>
      <hr />
      <code>{JSON.stringify(request, null, 2)}</code>
    </>
  )
}

export default PurchaseReqDetails;


//  this app is supposed to display all the details of the pR
//  and give the user the ability to modify some of the items on it
//  and the details on the pr

