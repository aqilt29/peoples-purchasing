import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import Loading from './Loading';
import { Label } from 'reactstrap';
import { getAllUsers } from '../api/userApi';


const UserSelect = ({ width = '75%', userId, userChange, label = 'Select User'}) => {
  const [users, setUsers] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const mapUsersToId = (usersArray) => {
    console.log(usersArray)
    return usersArray.map(({ firstName, lastName, _id }) => {
      return { value: _id, label: `${firstName} ${lastName}` }
    })
  }

  useEffect(() => {
    const fn = async () => {
      setLoading(true)

      try {
        const data = await getAllUsers();

        const mappedUsers = mapUsersToId(data);

        setUsers(mappedUsers)
      } catch (error) {
        window.alert(error)
        setLoading(false)
      }

      setLoading(false)
    }

    fn()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className="my-3">
      <Label style={{ width: width }}>{label}
        <Select
          onChange={(data) => userChange(data)}
          options={users}
          defaultValue={userId ?  _.find(users, { value: userId }) : undefined}
        />
      </Label>
    </div>
  )
}

export default UserSelect;
