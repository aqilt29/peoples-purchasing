import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ItemList from '../Components/requestForms/ItemList'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Loading from '../Components/Loading';
import { getRequestById, approveRequest, denyRequest, askForRequestApproval } from '../api/requestApi';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import { useAuth0 } from '../react-auth0-spa';
import { SmallP, BlueButton } from '../Styles';
import ItemCart from '../Components/PurchaseRequestForms/ItemsCart';

const PurchasingView = () => {
  const { id, approverId = false } = useParams();
  console.log(approverId)
  const { dbUser: { email } } = useAuth0()

  let alertColor = 'warning'
  const [isLoading, setLoading] = useState(false);
  const [requestData, setData] = useState(false)
  const [approverView, setApproverView] = useState(false)
  const [approvedToRedirect, setRedirect] = useState(false)

  const approveRequestAndRedirect = async (_id, email, approverId) => {
    try {
      await approveRequest(_id, email, approverId)
      console.log('approved')
      setRedirect(true)
    } catch (error) {
      window.alert(error)
      console.error(error)
    }
  }

  const denyRequestAndRedirect = async (_id, email, approverId) => {

    let reason = window.prompt('Rejection Explanation:')

    try {
      await denyRequest(_id, email, approverId, reason)
      console.log('denied')
      setRedirect(true)
    } catch (error) {
      window.alert(error)
      console.error(error)
    }
  }

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

  if (approvedToRedirect) return <Redirect to="/" />

  return (
    <>
      <h3>Purchase Request Details</h3>
      <h4>REQ-{requestData._id.slice(-5).toUpperCase()}</h4>
      <Container>
        <Row>
          {/* row for header details */}
          <Col>
            <Row>
              <Col><strong>Date Requested:</strong></Col>
              <Col><SmallP>{format(new Date(requestData.dateRequested), 'MM/dd/yyyy')}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>User Submitted:</strong></Col>
              <Col><SmallP>{`${requestData.user.firstName} ${requestData.user.lastName}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>User Email:</strong></Col>
              <Col><SmallP>{`${requestData.user.email}`}</SmallP></Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col><strong>Entity Billed:</strong></Col>
              <Col><SmallP>{`${requestData.entity.name}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Invoice Total Amount:</strong></Col>
              <Col><SmallP>{`$${requestData.invoiceTotal}`}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Business Justification:</strong></Col>
              <Col><SmallP>{`${requestData.businessNeed}`}</SmallP></Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h6>Attachments</h6>
            {
              requestData.attachments.length > 0 ? requestData.attachments.map((URL, index) => {
                console.log(URL);
                return (
                  <div>
                    <a target="_blank" href={URL}>Attachment {index + 1}</a>
                  </div>
                )
              }) : <p>No Attachments</p>
            }
          </Col>
          <Col>
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
              <Button onClick={() => approveRequestAndRedirect(requestData._id, email, approverId)} color="success">Approve</Button>
              {" "}
              <Button onClick={() => denyRequestAndRedirect(requestData._id, email, approverId)} color="danger">Deny</Button>
            </Col> )
          }
        </Row>
        <hr />
        <Row>
        <Col>
          <h6>Items on List</h6>
          <ItemCart items={requestData.items} details />
        </Col>
      </Row>
      </Container>
    </>
  )
};

export default PurchasingView;
