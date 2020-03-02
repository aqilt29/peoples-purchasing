import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import RequestListItem from './RequestListItem';

const RequestList = ({ listOfRequests, isPoScreen = false }) => {

  return (
    <>
      <h4>All Purchase Requests</h4>
      <Container>
        <Row>
          <Col>
            <Table striped size="sm" responsive>
              <thead >
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  {isPoScreen || <th>Status</th>}
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
                  listOfRequests.length > 0 && listOfRequests.map((request, idx) => {
                    return <RequestListItem key={idx} idx={idx} request={request} />
                  })
                }
                {
                  listOfRequests.length < 1 && <h3>No Entries</h3>
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default RequestList;
