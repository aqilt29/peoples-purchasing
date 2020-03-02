import React, { useState } from 'react';
import { Container, Col, Row, Table } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { BlueButton } from '../Styles';
import Loading from '../Components/Loading';
import { searchPoById } from '../api/purchaseOrderApi';
import PurchaseOrderListItem from '../Components/PurchaseOrderListItem'

const SearchAllPurchaseOrders = () => {
  const [foundPurchaseOrders, setFoundRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const searchForPo = async (_, { lookupId }) => {
    setIsLoading(true)
    const results =  await searchPoById(lookupId);
    setFoundRequests(results);
    setIsLoading(false)
  };

  if (isLoading) return <Loading />

  return (
    <>
      <h3>Search PRs By ID</h3>
      <Container>
        <Row>
          <Col sm={{ size: 4, offset: 4}} >
            <AvForm onValidSubmit={searchForPo}>
              <AvField
                type="text"
                label="Enter PR ID:"
                name="lookupId"
                required
              />
              <BlueButton>Search</BlueButton>
            </AvForm>
          </Col>
        </Row>
        <Row>
          <Col>
          <h4>Search Results</h4>
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
                  foundPurchaseOrders.length > 0 && foundPurchaseOrders.map((purchaseOrder, idx) => {
                    return (
                      <PurchaseOrderListItem purchaseOrder={purchaseOrder} idx={idx} />
                    )
                  })
                }
              </tbody>
            </Table>
            {
              foundPurchaseOrders.length < 1 && <h3>No Entries</h3>
            }
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default SearchAllPurchaseOrders;
