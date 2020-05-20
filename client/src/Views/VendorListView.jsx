import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import { Container, Row, Col, Table } from 'reactstrap';
import { getVendorList } from '../api/vendorApi';
import VendorListItem from '../Components/VendorListItem';

const VendorListView = () => {
  const [isLoading, setLoading] = useState(false);
  const [vendorData, setData] = useState([])

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      const data = await getVendorList('admin')

      setData(data);
      setLoading(false);
      console.log(data)
    }
    fn()
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      <h3>All Vendors</h3>
      <Container>
        <Row>
          <Col>
            <Table striped size="sm" responsive>
              <thead >
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Website</th>
                  <th>Phone</th>
                  <th>Attn</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Has W9</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {
                  vendorData.map((vendor, idx) => {
                    return (<VendorListItem key={idx} idx={idx} vendor={vendor} />)
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

export default VendorListView;
