/*
  this component displays all the information of a user
  with the ability to edit the user doc in place with a PUT method
*/

import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import Loading from '../Components/Loading';
import { useRouteMatch } from 'react-router-dom';
import { getUserByID } from '../api/userApi';

const UserDetails = () => {
  const { params: { id: userID } } = useRouteMatch()

  useEffect(() => {

    const fn = async () => {
      const user = await getUserByID(userID)

      console.log(user)
    }

    fn()
  }, [])

  return (
    <>
      <h3>User Details</h3>
      <Container>
        <Row>

        </Row>
      </Container>
    </>
  )
}

export default UserDetails;
