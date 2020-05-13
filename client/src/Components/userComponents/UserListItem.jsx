import React from 'react';
import { Link } from 'react-router-dom';


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
      <td>{user.isDisabled === false ? 'Active' : 'Disabled'}</td>
      <td><Link to={`details/${user._id}`}>View</Link></td>
    </>
  )
};

export default UserListItem;
