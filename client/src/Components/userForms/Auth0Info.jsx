import React from 'react';
import { Row, Col } from 'reactstrap';
import { costCenters } from '../../utils/lists';
import { AvField } from 'availity-reactstrap-validation';

const Auth0Info = () => {

  return (
    <>
      <Row>
        <Col>
          <AvField name="lastName" label="Last Name:" type="text" required placeholder="West" />
          <AvField name="auth0Id" label="Auth0 Id:" type="text" required placeholder="{ sub: 'auth0|...'}" />
          <AvField type="select" name="costCenter" label="Cost Center Assignment:" validate={{required: {value: true, errorMessage: 'Please select an entry from the list'}}}>
            <option value="">Select Cost Center...</option>
            {
              costCenters.map((num) => <option>{num}</option>)
            }
          </AvField>
        </Col>
      </Row>
    </>
  )
};

export default Auth0Info;
