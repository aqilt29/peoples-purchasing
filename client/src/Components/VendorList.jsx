import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import VendorListItem from './VendorListItem';

const VendorList = ({ vendorList }) => {

  return (
    <>
        <Row>
          <Col>
            <Table striped size="sm" responsive>
              <thead >
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Website</th>
                  <th>Phone</th>
                  <th>Attn</th>
                  <th>Email</th>
                  <th>Has W9</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {
                  vendorList.map((vendor, idx) => {
                    return <VendorListItem vendor={vendor} idx={idx} key={idx} />
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
    </>
  )
};

export default VendorList;
