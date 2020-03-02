import React from 'react';
import { Container, Row, Col, Label, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { BlueButton } from '../Styles'

const CreatePurchaseOrder = () => {
  return (
    <>
      <h3>Create PO</h3>
      <Container>
        {/* Row for entering in PO info */}
        <AvForm>
          <Row>
            <Col>
              <h5>PO Information</h5>
                <Row>
                  <Col>
                    <AvField
                      required
                      type="text"
                      name="purchaseOrderId"
                      label="Purchase Order ID:"
                    />
                  </Col>
                  <Col>
                  <AvGroup>
                    <div className="mb-2">
                      <div>
                        <Label>Invoice Total:</Label>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <AvInput
                          required
                          pattern='[0-9]{0,5}'
                          type="number"
                          name="invoiceAmount"
                          min={0}
                          placeholder="420.50"
                        />
                      </div>
                    </div>
                  </AvGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <AvField
                      required
                      type="date"
                      name="dateOrdered"
                      label="Order Placement Date:"
                    />
                  </Col>
                  <Col>
                    <AvField
                      required
                      type="date"
                      name="deliveryDate"
                      label="Expected Delivery Date:"
                    />
                  </Col>
                </Row>
                <BlueButton>Submit PO</BlueButton>
              </Col>
              <Col>
                <h5>Search & Add Purchase Requisitions</h5>
                <Row>
                  <Col>

                  </Col>
                </Row>
                <Row>
                  <Col>

                  </Col>
                </Row>
                <Row></Row>
              </Col>
          </Row>
        </AvForm>
        <hr />
        {/* Row for Selecting PR(s) */}
        <Row>
          <Col>
            <h6>Search For Pr:</h6>
          </Col>
          <Col>
            <h6>PR Information:</h6>
          </Col>
        </Row>
        <hr />
        {/* Row for seeing all the items added */}
        <Row>

        </Row>
      </Container>
    </>
  )
};

export default CreatePurchaseOrder;