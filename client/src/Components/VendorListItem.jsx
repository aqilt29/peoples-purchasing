import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const VendorListItem = ({ vendor, idx }) => {

  return (
    <tr>
      <td>{(idx + 1)}</td>
      <td>{vendor._id.slice(-5).toUpperCase()}</td>
      <td>{vendor.name}</td>
      <td>{vendor.website}</td>
      <td>{vendor.isDeleted ? 'Disabled' : 'Active'}</td>
      <td><Button tag={Link} to={`/vendors/details/${vendor._id}`} color="link" style={{ float: 'none' }}>View</Button></td>
    </tr>
  )
};

export default VendorListItem;
