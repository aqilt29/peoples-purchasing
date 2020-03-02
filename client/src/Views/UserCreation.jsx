import React, { useState } from "react";
import { Container, Col, Row } from "reactstrap";
import Loading from "../Components/Loading";
import { createNewUser } from "../api/userApi";
import { GoldButton } from "../Styles";
import { AvForm } from "availity-reactstrap-validation";
import UserInfo from '../Components/userComponents/userForms/UserInfo'
import Auth0Info from '../Components/userComponents/userForms/Auth0Info'

const UserCreation = () => {
  const [isLoading, setLoading] = useState(false)

  const handleUserSubmission = (_, data) => {

    const submitData = async () => {
      let info;
      setLoading(true);
      try {
        info = await createNewUser(data)
      } catch (error) {
        console.error(error)
      }
      console.log(info)
      setLoading(false)
    }

    submitData();
  };

  if (isLoading) return <Loading />

  return (
    <Container>
    <AvForm onValidSubmit={handleUserSubmission}>
      <Row>
        <Col>
          <h3>Create User...</h3>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <UserInfo />
        </Col>
        <Col>
          <Auth0Info />
        </Col>
      </Row>
      <Row>
        <GoldButton>Submit</GoldButton>
      </Row>
      </AvForm>
    </Container>
  )
}


export default UserCreation;
