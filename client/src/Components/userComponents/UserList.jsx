import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import UserListItem from './UserListItem';
import { getAllUsers } from '../../api/userApi';
import Loading from '../Loading';

const UserList = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    const getUsers = async () => {
      const data = await getAllUsers();
      setUsers(_.orderBy(data, ['firstName']))
      console.log(data)
      setLoading(!isLoading);
    };

    getUsers()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div>
      <Table striped responsive>
        <thead >
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Entity</th>
            <th>Role</th>
            <th>Cost Center</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
        {
          users.length > 0 && users.map((user, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <UserListItem user={user} index={idx} />
              </tr>
            )
          })
        }
      </tbody>
      </Table>
    </div>
  )
};

export default UserList;
