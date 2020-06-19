import React from 'react'
import { Button } from 'reactstrap'

const ItemsCartListItem = ({ item, arrayHelpers, index, details }) => {
  // const linkToOnline = item.link || '#';
  console.log(item, index)
  return (
    <>
      <td>{item.description}</td>
      <td>{item.specialDetails}</td>
      <td>{item.expenseCategory}</td>
      <td>${item.price}</td>
      <td>{item.quantity} units</td>
      <td>${item.quantity * item.price}</td>
      {details || (<td><Button onClick={() => arrayHelpers.remove(index)} close style={{ float: 'none' }}/></td>)}
    </>
  )
};

export default ItemsCartListItem;
