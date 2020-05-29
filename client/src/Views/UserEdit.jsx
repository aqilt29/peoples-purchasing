/*
  this component displays all the information of a user
  with the ability to edit the user doc in place with a PUT method
*/

import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import Loading from '../Components/Loading';
import { useRouteMatch } from 'react-router-dom';
import { getUserByID, updateUser } from '../api/userApi';
import { GoldButton, BlueButton } from '../Styles';
import { roleTypes, costCenters } from '../utils/lists';
import listOfEntities from '../../../server/reference/listOfEntities';
import { getAllEntities } from '../api/entitiesApi';

const submitUserUpdates = async (userUpdateData, userID) => {
  let updatedUser;

  try {
    updatedUser = await updateUser({ userID, userUpdateData })
  } catch (error) {
    window.alert(`${error} - 002`)
    return error
  }
  console.log(updatedUser, '-002')
}

const UserEdit = ({ history }) => {
  const { params: { id: userID } } = useRouteMatch();
  const [isLoading, setLoading] = useState(false);
  const [entities, setEntities] = useState(undefined)
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fn = async () => {
      setLoading(true);
      const userData = await getUserByID(userID);
      setUser(userData);

      let entityData = null;

      try {
        let entityData = await getAllEntities();
        console.log(entityData);
        setEntities(entityData);
      } catch (error) {
        window.alert(error, entityData);
      }

      setLoading(false);
    }

    fn()
  }, [])

  const validSubmission = async (_, userUpdateData) => {
    console.log(userUpdateData)
    setLoading(true)
    try {
      await submitUserUpdates(userUpdateData, userID)
    } catch (error) {
      window.alert(`${error} - 003`)
    }
    history.goBack()
    setLoading(false)
  }

  if (isLoading || !user) {
    return <Loading />
  } else {
    return (
      <>
        <h3>User Details</h3>
        <Container>
          <AvForm onValidSubmit={validSubmission} model={user}>
            <Row>
                <Col>
                    <AvField
                      name="firstName"
                      label="First Name:"
                      required
                    />
                    <AvField
                      name="lastName"
                      label="Last Name:"
                      required
                    />
                    <AvField
                      type="select"
                      name="entity"
                      label="Entity:"
                      validate={{required: {value: true, errorMessage: 'Please select an entity from the list'}}}>
                      <option value="">Select Entity...</option>
                      {
                        entities.map(({name}, idx) => <option key={`${idx}`}>{name}</option>)
                      }
                    </AvField>
                    <AvField type="select" name="costCenter" label="Cost Center:">
                      <option value="">Select Role...</option>
                      {
                        costCenters.map((name, idx) => <option key={`${idx}`}>{name}</option>)
                      }
                    </AvField>
                    <AvField type="select" name="role" label="Portal Role:" helpMessage="Please select which best describes you..." validate={{required: {value: true, errorMessage: 'Please select an entity from the list'}}}>
                      <option value="">Select Role...</option>
                      {
                        roleTypes.map((name, idx) => <option key={`${idx}`}>{name}</option>)
                      }
                    </AvField>
                    <AvField type="select" name="isDisabled" label="Is Disabled?:">
                      <option>true</option>
                      <option>false</option>
                    </AvField>
                    <AvField
                      name="auth0Id"
                      label="Auth0 ID:"
                      disabled
                    />
                    <AvField
                      name="email"
                      label="Email:"
                      disabled
                    />
                </Col>
                <Col>
                  <h5>Options:</h5>
                  <p>Note: Changing e-mail will <b>NOT</b> change the login email. Auth0 ID and Email are tied together statically</p>
                  <GoldButton className="m-2" >Save Changes</GoldButton>
                  <BlueButton className="m-2" onClick={() => history.goBack()}>Cancel</BlueButton>
                </Col>
            </Row>
          </AvForm>
        </Container>
      </>
    )
  }

}

export default UserEdit;
