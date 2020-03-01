import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { BlueButton } from '../Styles'
import { getItemById } from '../api/itemApi';

const ItemDetailsPage = (props) => {
  const { params: { itemId, documentId } } = useRouteMatch()
  console.log(itemId, documentId)
  console.log(props)

  return (
    <>
      <h3>Item Details Page</h3>
      <BlueButton onClick={() => getItemById(itemId, documentId)} >API</BlueButton>
    </>
  )
};

export default ItemDetailsPage;
