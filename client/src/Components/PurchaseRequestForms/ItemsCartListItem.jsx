import React from 'react'
import { Button } from 'reactstrap'

const ItemsCartListItem = ({ item, arrayHelpers, index }) => {
  // const linkToOnline = item.link || '#';
  console.log(item, index)
  return (
    <>
    <td>{item.description}</td>
    <td>{item.specialDetails}</td>
      {/* <td>{item.description}</td>
      <td>{item.requestByDate}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>${(item.price * item.quantity)}</td> */}
      <td><Button onClick={() => arrayHelpers.remove(index)} close style={{ float: 'none' }}/></td>
    </>
  )
};

export default ItemsCartListItem;
