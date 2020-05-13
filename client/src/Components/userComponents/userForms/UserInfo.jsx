import React from 'react';
import { Row, Col } from 'reactstrap';
import { listOfEntities, roleTypes } from '../../../utils/lists';
import { AvField } from 'availity-reactstrap-validation';

const UserInfo = () => {

  return (
    <>
      <Row>
        <Col>
          <AvField name="firstName" label="First Name:" type="text" required />
          <AvField name="email" label="email:" type="email" required />
          <AvField type="select" name="entity" label="Corporate Entity:" validate={{required: {value: true, errorMessage: 'Please select an entity from the list'}}}>
            <option value="">Select Entity...</option>
            {
              listOfEntities.map(({name}) => <option>{name}</option>)
            }
          </AvField>
          <AvField type="select" name="role" label="Role:" required>
            <option value="">Select Role...</option>
            {
              roleTypes.map((name) => <option>{name}</option>)
            }
          </AvField>
        </Col>
      </Row>
    </>
  )
};

export default UserInfo;
