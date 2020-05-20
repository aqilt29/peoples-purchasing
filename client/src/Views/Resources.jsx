import React from 'react';
import sharepoint from '../Assets/sharepoint.png'
import { Container, Row, Col, ListGroup, ListGroupItem, Media } from 'reactstrap';
console.log(process.env.SHAREPOINT_RESOURCES)

const Resources = () => {
  return (
    <>
      <h3>Resources</h3>
      <Container>
        <Row>
          <Col>
            <h5>Purchasing Portal Resources Available on SharePoint:</h5>
            <ListGroup>
              <ListGroupItem>Standard Operating Procedure – Procuring Goods and Services (PR Approval Signature Limits)</ListGroupItem>
              <ListGroupItem>Word Desk Instruction (WDI) on how to create PRs/PO’s and attach documents</ListGroupItem>
              <ListGroupItem>Authorized E-Tailers and Buyers/Users for online purchases</ListGroupItem>
              <ListGroupItem>Entity billed, class code, material groups, and G/L accounts cheat sheet</ListGroupItem>
            </ListGroup>
          </Col>
          <Col>
            <h5>Documentation:</h5>
            <h7>Click Logo Below for Documentation located on SharePoint:</h7>
            <Media>
              <Media target="_blank" href={process.env.SHAREPOINT_RESOURCES}>
                <Media tag="img" src={sharepoint} />
              </Media>
            </Media>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default Resources;
