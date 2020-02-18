import React from 'react';
import { Button } from 'reactstrap';


const DisplayItem = ({ item, index, deleteItem }) => {

  return (
    <>
      <td>{item.description}</td>
      <td>{item.requestByDate}</td>
      <td>${item.price}</td>
      <td>{item.unitOfMeasure}</td>
      <td>{item.quantity}</td>
      <td>${(item.price * item.quantity)}</td>
      <td><Button onClick={() => deleteItem(index)} close style={{ float: 'none' }}/></td>
    </>
  )
};

export default DisplayItem;
