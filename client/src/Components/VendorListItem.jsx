import React from 'react';
import { Button } from 'reactstrap';

const VendorListItem = ({ vendor, idx }) => {

  return (
    <tr>
      <td>{(idx + 1)}</td>
      <td>{vendor.name}</td>
      <td>{vendor.website}</td>
      <td>{vendor.phone}</td>
      <td>{vendor.attn}</td>
      <td>{vendor.email}</td>
      <td>{vendor.hasW9 ? 'Yes' : 'No'}</td>
      <td><Button onClick={() => console.log('hello')} color="link" style={{ float: 'none' }}>View</Button></td>
    </tr>
  )
};

export default VendorListItem;
