import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { SmallP, BlueButton } from '../Styles';
import { format } from 'date-fns'
import { getItemById } from '../api/itemApi';
import Loading from '../Components/Loading';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap'

const ItemDetailsPage = (props) => {
  const { params: { itemId, documentId } } = useRouteMatch()
  const [item, setItem] = useState(null)
  const [isLoading, setLoading] = useState(false)

  console.log(item)

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      try {
        const data = await getItemById(itemId, documentId);
        setItem(data)

      } catch (error) {
        window.alert(error)
        console.error(error)

      }

      setLoading(false)
    }

    fn()
  }, [])

  if (isLoading || !item) return <Loading />

  return (
    <>
      <h3>Item Details Page</h3>
      <Container>
        <Row>
          <Col>
            <Row>
              <Col><strong>Purchase Req ID:</strong></Col>
              <Col><SmallP>{documentId.slice(-5).toUpperCase()}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Item Name:</strong></Col>
              <Col><SmallP>{item.description}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Material Group:</strong></Col>
              <Col><SmallP>{item.materialGroup}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Requested Delivery:</strong></Col>
              <Col><SmallP>{format(new Date(item.requestByDate), 'MM/dd/yyyy')}</SmallP></Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col><strong>Pricing:</strong></Col>
              <Col><SmallP>${item.price}/{item.unitOfMeasure}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Direct Material:</strong></Col>
              <Col><SmallP>{item.isDirect ? 'Yes' : 'No'}</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Quantity Requested:</strong></Col>
              <Col><SmallP>{item.quantity} units</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Link:</strong></Col>
              <Col><Button disabled={!item.link} style={{ 'lineHeight': '.75', paddingLeft: 0 }} href={item.link || '#'} target="_blank" color="link">Online Link</Button></Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={6}>
            <Row>
              <Col><strong>Quantity Requested:</strong></Col>
              <Col><SmallP>{item.quantity} units</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Quantity Invoiced:</strong></Col>
              <Col><SmallP>{item.invoicedQty} units</SmallP></Col>
            </Row>
            <Row>
              <Col><strong>Quantity Delivered:</strong></Col>
              <Col><SmallP>{item.receivedQty} units</SmallP></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default ItemDetailsPage;
