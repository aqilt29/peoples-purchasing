import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { getRequestById, askForRequestApproval } from '../api/requestApi';
import Loading from '../Components/Loading';
import { Container, Col, Row, Alert } from 'reactstrap'
import { SmallP, BlueButton } from '../Styles';
import { format } from 'date-fns'
import PurchaseReqFileUploader from '../Components/PurchaseReqFileUploader';
import ItemList from '../Components/requestForms/ItemList'

const PurchaseReqDetails = (props) => {
  const { params: { id } } = useRouteMatch();
  const [request, setRequest] = useState(null);
  const [isLoading, setLoading] = useState(false);


  console.log(id)
  console.log(props)
  console.log(request)

  let alertColor = 'warning'

  const submitAskForApproval = async (requestId) => {
    setLoading(true);

    const data = await askForRequestApproval(requestId);
    console.log(data);

    setLoading(false);
  };

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

  if (request && request.status === 'Approved') alertColor = 'success'
  if (request && request.status === 'Denied') alertColor = 'danger'

  if (isLoading || !request) return <Loading />

  return (
    <>
      <h3>Requisition Details</h3>{" "}{ request.isDeleted && <Alert color="danger">This PR has been marked for deletion.</Alert>}
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
              <Col><SmallP>{`${request.buyer.email}`}</SmallP></Col>
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
        <hr />
        <Row>
          <Col>
            <h6>Request Status:</h6>
            <Alert color={alertColor}>{request.status}</Alert>
          </Col>
          <Col>
            {
              request.status === 'Saved' ? <BlueButton style={{ transform: 'translateY(25px)' }} onClick={() => submitAskForApproval(id)} >Send For Approval</BlueButton> : null
            }
            {" "}
            {
              request.status === 'Saved' ? <BlueButton style={{ transform: 'translateY(25px)' }} tag={Link} to={`/purchasing/edit/${id}`} >Edit Purchase Req</BlueButton> : null
            }
          </Col>
        </Row>
        <hr />
        <Row>
          {/* row for uploading and information on that */}
        <Col>
          <h6>Approval Status</h6>
            {
              request.approverList.map((approver, idx) => {
                console.log(approver)
                return (
                  <div key={idx}>
                    <strong>#{idx + 1}</strong>{" "}
                    <SmallP>{approver.email},</SmallP>{" "}
                    <SmallP>{approver.isSent ? 'Email Sent' : 'Email Pending'},</SmallP>{" "}
                    <SmallP>{approver.isApproved ? `Approved ${format(new Date(approver.dateApproved), 'MM/dd/yyyy')} ` : 'Approval Pending'}</SmallP>
                  </div>
                )
              })
            }
        </Col>
        <Col>
            <h6>Attach Documents</h6>
            <PurchaseReqFileUploader />
        </Col>
        <Col>
            <h6>Attachments</h6>
        </Col>
        </Row>
        <Row>
          {/* row for approval information */}
        </Row>
        <hr />
        <Row>
          <Col>
            <h6>Items on List</h6>
            <ItemList
              documentId={id}
              items={request.items}
              deleteItem={() => {}}
              detailsPage
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PurchaseReqDetails;


//  this app is supposed to display all the details of the pR
//  and give the user the ability to modify some of the items on it
//  and the details on the pr

