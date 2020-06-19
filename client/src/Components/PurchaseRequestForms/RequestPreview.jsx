import React from 'react';
import { useFormikContext } from 'formik';
import { Container, Row, Col } from 'reactstrap';
import { ItemsCart } from '.';

const RequestPreview = () => {
  const { values, ...rest } = useFormikContext()
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>Request Preview</h3>
          </Col>
        </Row>
        <Row>
        <Col>
          <h3>Request Items List</h3>
          <ItemsCart items={values.items} details />
        </Col>
        </Row>
        <hr />
        <Row>
        <Col>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Col>
        </Row>
      </Container>
    </>
  )
};

export default RequestPreview;
