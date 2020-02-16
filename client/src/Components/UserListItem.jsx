import React from 'react';
import { Button } from 'reactstrap';


const UserListItem = ({ user, index, deleteItem }) => {
  console.log(user)
  return (
    <>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.entity}</td>
      <td>{user.role}</td>
      <td>{user.costCenter}</td>
      <td><Button onClick={() => console.log(user.id, index)} close style={{ float: 'none' }}/></td>
    </>
  )
};

export default UserListItem;
