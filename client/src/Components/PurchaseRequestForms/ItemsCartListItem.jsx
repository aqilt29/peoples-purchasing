import React from 'react'
import { Button } from 'reactstrap'

const ItemsCartListItem = ({ item, arrayHelpers, index, details }) => {
  // const linkToOnline = item.link || '#';

  return (
    <>
      <td>{item.description}</td>
      {details && (<td>{item.specialDetails}</td>)}
      {details && (<td>{item.expenseCategory}</td>)}
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>${item.quantity * item.price}</td>
      {details || (<td><Button onClick={() => arrayHelpers.remove(index)} close style={{ float: 'none' }}/></td>)}
    </>
  )
};

export default ItemsCartListItem;
