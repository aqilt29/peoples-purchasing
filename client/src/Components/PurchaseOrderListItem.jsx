import React from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash'

import { format } from 'date-fns'
import { Link } from 'react-router-dom';


const PurchaseOrderListItem = ({ purchaseOrder, idx }) => {

  return (
    <tr>
      <td>{(idx + 1)}</td>
      <td>PO-{purchaseOrder.purchaseOrderId}</td>
      <td>{purchaseOrder.status}</td>
      <td>{purchaseOrder.vendor.name}</td>
      <td>{format(new Date(purchaseOrder.dateCreated), 'MM/dd/yyyy')}</td>
      <td>${purchaseOrder.dateOrdered}</td>
      <td>{purchaseOrder.deliveryDate}</td>
      <td>${purchaseOrder.invoiceAmount}</td>
      <td>{purchaseOrder.user.firstName} {purchaseOrder.user.lastName}</td>
      <td><Button tag={Link} to={`/purchaseorders/details/${purchaseOrder._id}`} color="link" style={{ float: 'none' }}>View</Button></td>
    </tr>
  )
};

export default PurchaseOrderListItem;
