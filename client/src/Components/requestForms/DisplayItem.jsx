import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const DisplayItem = ({ documentId = undefined, item, index, deleteItem, detailsPage = false }) => {
  const linkToOnline = item.link || '#';
  console.log(detailsPage)
  return (
    <>
      <td>{item.description}</td>
      <td>{item.requestByDate}</td>
      <td>${item.price}</td>
      <td>{item.unitOfMeasure}</td>
      <td>{item.quantity}</td>
      <td>${(item.price * item.quantity)}</td>
      {detailsPage || <td><Button onClick={() => deleteItem(index)} close style={{ float: 'none' }}/></td>}
      {detailsPage && <td><Button style={{ 'lineHeight': '.75', paddingLeft: 0 }} href={linkToOnline} target="_blank" color="link">Online Link</Button></td>}
      {detailsPage && <td><Button style={{ 'lineHeight': '.75', paddingLeft: 0 }} tag={Link} to={`/purchasing/details/item/${item._id}/${documentId}`} target="_blank" color="link">View</Button></td>}
    </>
  )
};

export default DisplayItem;
