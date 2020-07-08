import React from 'react'
import { Button } from 'reactstrap'

const ItemsCartListItem = ({ item, arrayHelpers, index, details }) => {
  const linkToOnline = item.link || '#';

  return (
    <>
      <td>{item.description}</td>
      {details && (<td>{item.specialDetails}</td>)}
      {details && (<td>{item.expenseCategory}</td>)}
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>${item.quantity * item.price}</td>
      {details && (<td><Button style={{ 'lineHeight': '.75', paddingLeft: 0 }} disabled={linkToOnline === '#' ? true : false} href={linkToOnline} target="_blank" color="link">Details</Button></td>)}
      {details || (<td><Button onClick={() => arrayHelpers.remove(index)} close style={{ float: 'none' }}/></td>)}
    </>
  )
};

export default ItemsCartListItem;
