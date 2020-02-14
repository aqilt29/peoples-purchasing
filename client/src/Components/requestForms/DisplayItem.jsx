import React from 'react';

const DisplayItem = ({ item }) => {
  console.log(item)
  return (
    <>
      <td>{item.description}</td>
      <td>{item.requestByDate}</td>
      <td>${item.price}</td>
      <td>{item.unitOfMeasure}</td>
      <td>{item.quantity}</td>
      <td>${(item.price * item.quantity)}</td>
    </>
  )
};

export default DisplayItem;
