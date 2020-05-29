import React, { useEffect, useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { getAllRequestsByUser } from '../api/requestApi';
import Loading from '../Components/Loading';
import { Container, Row, Col, Table } from 'reactstrap';
import RequestListItem from '../Components/RequestListItem';

const PurchasingViewAll = () => {
  const { dbUser } = useAuth0()
  const [isLoading, setLoading] = useState(false);
  const [requestData, setData] = useState([])

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      const { data } = await getAllRequestsByUser(dbUser);
      setData(data);
      setLoading(false);
      console.log(data)
    }
    fn()
  }, [])

  if (isLoading) return <Loading />

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
                  <th>Req#</th>
                  <th>PR Status</th>
                  <th>Date</th>
                  <th>Entity</th>
                  <th>Total Amt</th>
                  <th>Approval Awaiting</th>
                  <th>Vendor</th>
                  <th>Submitted For</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {
                  requestData.length > 0 && requestData.map((request, idx) => {
                    return <RequestListItem key={idx} idx={idx} request={request} />
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

export default PurchasingViewAll;
