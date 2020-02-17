import React from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash'

import { format } from 'date-fns'


const RequestListItem = ({ request, idx }) => {

  const getNextApprover = ({approverList}) => {
    return _.find(approverList, function(o) {
      if (!o.isApproved) {
        return o
      } else {
        return 'null'
      }
    })
  };

  return (
    <tr>
      <td>{(idx + 1)}</td>
      <td>{request.status}</td>
      <td>{request.businessNeed}</td>
      <td>{format(new Date(request.dateRequested), 'MM/dd/yyyy')}</td>
      <td>${request.invoiceTotal}</td>
      <td>{request.paymentTerms}</td>
      <td>{getNextApprover(request).email}</td>
      <td>{request.vendor.name}</td>
      <td>{request.submittedFor.firstName}</td>
      <td><Button onClick={() => console.log('hello')} color="link" style={{ float: 'none' }}>View</Button></td>
    </tr>
  )
};

export default RequestListItem;
