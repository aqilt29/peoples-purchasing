import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { Container, Row, Col, Table } from 'reactstrap';
import { getAllPOs } from '../api/purchaseOrderApi';
import PurchaseOrderListItem from '../Components/PurchaseOrderListItem';

const AllPurchaseOrdersPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [poData, setData] = useState([])

  useEffect(() => {
    const fn = async () => {
      console.log('useEffect')
      setLoading(true);
      const data = await getAllPOs();
      setData(data);
      setLoading(false);
      console.log(data)
    }
    fn()
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      <h4>All Purchase Orders</h4>
      <Container>
        <Row>
          <Col>
            <Table striped size="sm" responsive>
              <thead >
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Vendor</th>
                  <th>Date Created</th>
                  <th>Date Ordered</th>
                  <th>Delivery Date</th>
                  <th>Invoice Amt</th>
                  <th>Submitted By</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {
                  poData.map((purchaseOrder, idx) => {
                    return (
                      <PurchaseOrderListItem purchaseOrder={purchaseOrder} idx={idx} />
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default AllPurchaseOrdersPage;
