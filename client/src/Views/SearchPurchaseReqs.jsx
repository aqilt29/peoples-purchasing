import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Table } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { BlueButton } from '../Styles';
import { searchRequestById } from '../api/requestApi';
import Loading from '../Components/Loading';
import RequestListItem from '../Components/RequestListItem';

const SearchPurchaseReqs = () => {
  const [foundRequests, setFoundRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const searchForRequests = async (_, { lookupId }) => {
    setIsLoading(true)
    const results =  await searchRequestById(lookupId);
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
            <AvForm onValidSubmit={searchForRequests}>
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
          <h4>All Purchase Requests</h4>
            <Table striped size="sm" responsive>
              <thead >
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Business Need</th>
                  <th>Date</th>
                  <th>Invoice Amt</th>
                  <th>Terms</th>
                  <th>Waiting On</th>
                  <th>Vendor</th>
                  <th>Submitted For</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {
                  foundRequests.length > 0 && foundRequests.map((request, idx) => {
                    return <RequestListItem key={idx} idx={idx} request={request} />
                  })
                }
                {
                  foundRequests.length < 1 && <h3>No Entries</h3>
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default SearchPurchaseReqs;
