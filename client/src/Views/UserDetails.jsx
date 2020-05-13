/*
  this component displays all the information of a user
  with the ability to edit the user doc in place with a PUT method
*/

import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import Loading from '../Components/Loading';
import { useRouteMatch, Link } from 'react-router-dom';
import { getUserByID } from '../api/userApi';
import { BlueButton } from '../Styles';

const UserDetails = () => {
  const { params: { id: userID } } = useRouteMatch();
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fn = async () => {
      setLoading(true);
      const userData = await getUserByID(userID);
      setUser(userData);

      setLoading(false);
    }

    fn()
  }, [])

  if (isLoading || !user) {
    return <Loading />
  } else {
    return (
      <>
        <h3>User Details</h3>
        <Container>
          <Row>
            <Col>
              <div style={{ display: 'flex' }}>
                <h5 style={{ marginRight: 'auto' }}>First Name:</h5>
                <p>{`${user.firstName}`}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h5 style={{ marginRight: 'auto' }}>Last Name:</h5>
                <p>{`${user.lastName}`}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h5 style={{ marginRight: 'auto' }}>Legal Entity:</h5>
                <p>{`${user.entity}`}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h5 style={{ marginRight: 'auto' }}>Cost Center:</h5>
                <p>{`${user.costCenter}`}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h5 style={{ marginRight: 'auto' }}>Portal Role:</h5>
                <p>{`${user.role}`}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h5 style={{ marginRight: 'auto' }}>Auth0 ID:</h5>
                <p>{`${user.auth0Id}`}</p>
              </div>
              <div style={{ display: 'flex' }}>
                <h5 style={{ marginRight: 'auto' }}>Email:</h5>
                <p>{`${user.email}`}</p>
              </div>
                <p>Note: Changing e-mail will <b>NOT</b> change the login email</p>
            </Col>
            <Col>
              <h5>Options:</h5>
              <BlueButton tag={Link} to={location => `${location.pathname}/edit`}>Edit User</BlueButton>
            </Col>
          </Row>
        </Container>
      </>
    )
  }

}

export default UserDetails;
