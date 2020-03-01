import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../Components/requestForms/ItemList'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Loading from '../Components/Loading';
import { getRequestById, approveRequest, denyRequest, askForRequestApproval } from '../api/requestApi';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import { useAuth0 } from '../react-auth0-spa';
import { SmallP, BlueButton } from '../Styles';
import PurchaseReqFileUploader from '../Components/PurchaseReqFileUploader';

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

  const submitAskForApproval = async (requestId) => {
    setLoading(true);

    const data = await askForRequestApproval(requestId);
    console.log(data);

    setLoading(false);
  };

  return (
    <>
      <h3>Purchase Request Details</h3>
      <h4>Id: {requestData._id.slice(-5).toUpperCase()}</h4>
      <Container>
        <Row>
        <Col>
          <h6>Vendor:</h6>
          <div className="mb-2">
            <div><h6>Name:</h6></div>
            <SmallP>{requestData.vendor.name}</SmallP>
            <div><h6>Address:</h6></div>
            <span>
              <SmallP>{requestData.vendor.address.street}</SmallP>
            </span>
            <div>
              <SmallP>{requestData.vendor.address.city}</SmallP>
              <SmallP>, {requestData.vendor.address.state}</SmallP>
              <SmallP> {requestData.vendor.address.zipCode}</SmallP>
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
          {
            requestData.status === 'Saved' ? <BlueButton onClick={() => submitAskForApproval(id)} >Send For Approval</BlueButton> : null
          }
          {" "}
          {
            requestData.status === 'Saved' ? <BlueButton tag={Link} to={`/purchasing/edit/${id}`} >Edit Purchase Req</BlueButton> : null
          }
        </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h6>Attach Documents</h6>
            <PurchaseReqFileUploader />
          </Col>
          <Col>
            <h6>Current Documents</h6>
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
                    <strong>#{idx + 1}</strong>{" "}
                    <SmallP>{approver.email},</SmallP>{" "}
                    <SmallP>{approver.isSent ? 'Email Sent' : 'Email Pending'},</SmallP>{" "}
                    <SmallP>{approver.isApproved ? 'Approved' : 'Approval Pending'}</SmallP>
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
