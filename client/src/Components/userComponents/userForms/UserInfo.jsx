import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { roleTypes } from '../../../utils/lists';
import { AvField } from 'availity-reactstrap-validation';
import { getAllEntities } from '../../../api/entitiesApi';
import Loading from '../../Loading';

const UserInfo = () => {
  const [isLoading, setLoading] = useState(true);
  const [entities, setEntities] = useState(undefined);

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      let entityData = null;

      try {
        let entityData = await getAllEntities();
        console.log(entityData)
        setEntities(entityData);
      } catch (error) {
        window.alert(error, entityData);
      }

      setLoading(false);
    }

    fn()
  },[])

  if (isLoading) return <Loading />

  if(!isLoading && (typeof entities !== "undefined")) {

    return (
      <>
        <Row>
          <Col>
            <AvField name="firstName" label="First Name:" type="text" required />
            <AvField name="email" label="email:" type="email" required />
            <AvField type="select" name="entity" label="Corporate Entity:" validate={{required: {value: true, errorMessage: 'Please select an entity from the list'}}}>
              <option value="">Select Entity...</option>
              {
                entities.map(({name}, idx) => <option key={`${idx}`}>{name}</option>)
              }
            </AvField>
            <AvField type="select" name="role" label="Role:" required>
              <option value="">Select Role...</option>
              {
                roleTypes.map((name, idx) => <option key={`${idx}`}>{name}</option>)
              }
            </AvField>
          </Col>
        </Row>
      </>
    )
  }
};

export default UserInfo;
