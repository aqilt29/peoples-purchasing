import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { GoldButton } from '../../Styles'
import { AvForm, AvField } from 'availity-reactstrap-validation';

const PurchaseRequestHeaders = ({ isEditing = false, headers, setHeaders, moveForm, ...props }) => {
  //  model is requestToEdit when editing
  //    otherwise it should be headers? or undefined?
  //    should it be the default user values?



  return (
    <>
      <h5>Request Headers</h5>
      <p>
        {Object.keys(props)}
      </p>
      <Container>
        <AvForm>
          <Row>
            <Col>

            </Col>
            <Col>

            </Col>
          </Row>
          <Row>
            <Col>
              <GoldButton onClick={moveForm} >Next</GoldButton>
            </Col>
          </Row>
        </AvForm>
      </Container>
    </>
  )
}

export default PurchaseRequestHeaders
