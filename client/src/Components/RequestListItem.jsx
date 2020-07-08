import React from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash'

import { format } from 'date-fns'
import { Link } from 'react-router-dom';


const RequestListItem = ({ request, idx }) => {

  const getNextApprover = ({approverList}) => {
    return _.find(approverList, function(o) { return o.isApproved === false})
  };

  console.log(request.entity)

  return (
    <tr>
      <td>{(idx + 1)}</td>
      <td>{request._id.slice(-5).toUpperCase()}</td>
      <td>{request.status}</td>
      <td>{request.referenceName}</td>
      <td>{format(new Date(request.dateRequested), 'MM/dd/yyyy')}</td>
      <td>{request.entity.name}</td>
      <td>${request.invoiceTotal}</td>
      {/* <td>{request.status !== 'Approved' ? getNextApprover(request).email : 'Approved' }</td> */}
      <td><Button tag={Link} to={`/purchasing/details/${request._id}`} color="link" style={{ float: 'none' }}>View</Button></td>
    </tr>
  )
};

export default RequestListItem;
