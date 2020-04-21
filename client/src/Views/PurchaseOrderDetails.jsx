import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Loading from '../Components/Loading';
import { getPoById } from '../api/purchaseOrderApi'
import { Container, Row, Col } from 'reactstrap';
import ItemList from '../Components/requestForms/ItemList'
import { SmallP } from '../Styles'
import { format } from 'date-fns'
import DocumentUploader from '../Components/DocumentUploader';
import { attachPOUploadLocation } from '../api/purchaseOrderApi';

const PurchaseOrderDetails = () => {
  const { params: { id } } = useRouteMatch();
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      let data;

      try {
        data = await getPoById(id);
        console.log(data)
        setPurchaseOrder(data.data);
      } catch (error) {
        setLoading(false);
        window.alert(error)
      }
      setLoading(false);
    }

    if (!purchaseOrder) {
      fn()
    }
  }, [])

  if (isLoading || !purchaseOrder) return <Loading />

  return (
    <>
      <h4>Purchase Order Details</h4>
      <h4>PO-{purchaseOrder.purchaseOrderId}</h4>
      <Container>
        <Row>
          <Col>
            <Row>
              <Col><strong>Date Created:</strong></Col>
              <Col><SmallP>{format(new Date(purchaseOrder.dateCreated), 'MM/dd/yyyy')}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Date Order Placed:</strong></Col>
              <Col><SmallP>{format(new Date(purchaseOrder.dateOrdered), 'MM/dd/yyyy')}</SmallP></Col>
            </Row>
            {/* <Row>
              <Col><strong>Date of Expected Delivery:</strong></Col>
              <Col><SmallP>{format(new Date(purchaseOrder.deliveryDate), 'MM/dd/yyyy')}</SmallP></Col>
            </Row> */}
          </Col>
          <Col>
            <Row>
              <Col><strong>Invoice Amount:</strong></Col>
              <Col><SmallP>${purchaseOrder.invoiceAmount}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Vendor:</strong></Col>
              <Col><SmallP>{purchaseOrder.vendor.name}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Status:</strong></Col>
              <Col><SmallP>{purchaseOrder.status}</SmallP></Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
              <h6>Attach Documents</h6>
              <DocumentUploader attachUploadLocation={attachPOUploadLocation} prefix={'PO'} />
          </Col>
          <Col>
            <h6>Attachments</h6>
            {
              purchaseOrder.attachments.length > 0 ? purchaseOrder.attachments.map((URL, index) => {
                console.log(URL);
                return (
                  <div>
                    <a target="_blank" href={URL}>Attachment {index + 1}</a>
                  </div>
                )
              }) : <p>No Attachments</p>
            }
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
          <h5>Items on Selected PR's:</h5>
            {
              purchaseOrder.purchaseRequests.length > 0 && purchaseOrder.purchaseRequests.map((request, idx) => {
                return (
                  <div key={idx}>
                    <h5>{request._id.slice(-5).toUpperCase()} Items:</h5>
                    <ItemList
                      documentId={request._id}
                      {...request}
                      detailsPage
                    />
                  </div>
                )
              })
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PurchaseOrderDetails;
