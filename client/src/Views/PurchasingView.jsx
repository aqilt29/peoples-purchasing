import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../Components/requestForms/ItemList'
import { format } from 'date-fns';

import Loading from '../Components/Loading';
import { getRequestById, approveRequest, denyRequest } from '../api/requestApi';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import { useAuth0 } from '../react-auth0-spa';
import { smallP } from '../Styles';

const PurchasingView = () => {
  const { id, approverId = false } = useParams();
  console.log(approverId)
  const { dbUser: { email } } = useAuth0()

  let alertColor = 'warning'
  const [isLoading, setLoading] = useState(false);
  const [requestData, setData] = useState(false)
  const [approverView, setApproverView] = useState(false)

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
      if (approverId) setApproverView(true)
      setLoading(false);
    }

    fn()
  }, [])

  if (isLoading || !requestData) return <Loading />
  if (requestData.status === 'Approved') alertColor = 'success'
  if (requestData.status === 'Denied') alertColor = 'danger'
  console.log(alertColor)
  return (
    <>
      <h3>Purchase Request Details</h3>
      <h4>Id: {requestData._id.slice(-4).toUpperCase()}</h4>
      <Container>
        <Row>
        <Col>
          <h6>Vendor:</h6>
          <div className="mb-2">
            <div><h6>Name:</h6></div>
            <smallP>{requestData.vendor.name}</smallP>
            <div><h6>Address:</h6></div>
            <span>
              <smallP>{requestData.vendor.address.street}</smallP>
            </span>
            <div>
              <smallP>{requestData.vendor.address.city}</smallP>
              <smallP>, {requestData.vendor.address.state}</smallP>
              <smallP> {requestData.vendor.address.zipCode}</smallP>
            </div>
          </div>
          <h6>Ship To Address:</h6>
          <p>{requestData.address.shipTo}</p>
          <h6>Submitted on Behalf of:</h6>
          <p>{requestData.submittedFor.firstName} {requestData.submittedFor.lastName}</p>
          <h6>Business Justification:</h6>
          <p>{requestData.businessNeed}</p>
        </Col>
        <Col>
          <h6>Buyer Submitting order:</h6>
          <p>{requestData.user.firstName}</p>
          <h6>Invoice Total Estimate:</h6>
          <p>${requestData.invoiceTotal}</p>
          <h6>Payment Terms:</h6>
          <p>{requestData.paymentTerms}</p>
          <h6>Date Requested:</h6>
          <p>{format(new Date(requestData.dateRequested), 'MM/dd/yyyy')}</p>
          <h6>Request Status:</h6>
          <Alert color={alertColor}>{requestData.status}</Alert>
        </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h6>Approval Status</h6>
            {
              requestData.approverList.map((approver, idx) => {
                return (
                  <div key={idx}>
                    <h7>{approver.email}</h7>{" "}
                    <h7>{approver.isSent ? 'Email Sent' : 'Email Pending'}</h7>{" "}
                    <h7>{approver.isApproved ? 'Approved' : 'Pending'}</h7>
                  </div>
                )
              })
            }
          </Col>
          { approverView && (
            <Col>
              <h6>Approve Request</h6>
              <Button onClick={() => approveRequest(requestData._id, email, approverId)} color="success">Approve</Button>
              {" "}
              <Button onClick={() => denyRequest(requestData._id, email, approverId)} color="danger">Deny</Button>
            </Col> )
          }
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
