import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Table } from 'reactstrap';
import { searchRequestById, getAllRequests } from '../api/requestApi';
import Loading from '../Components/Loading';
import RequestListItem from '../Components/RequestListItem';

const PurchasingAllByCompany = () => {
  const [foundRequests, setFoundRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true)

      let allRequests;

      try {
        allRequests = await getAllRequests();
        setFoundRequests(allRequests)
      } catch (error) {
        console.log(error)
        window.alert(error)
      }

      setIsLoading(false)
    }

    fn()
  }, [])

  const searchForRequests = async (_, { lookupId }) => {
    setIsLoading(true)
    const results =  await searchRequestById(lookupId);
    setFoundRequests(results);
    setIsLoading(false)
  };

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

export default PurchasingAllByCompany;