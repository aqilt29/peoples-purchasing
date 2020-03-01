import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const ItemDetailsPage = (props) => {
  const data = useRouteMatch()
  console.log(data)
  console.log(props)

  return (
    <>
      <h3>Item Details Page</h3>
    </>
  )
};

export default ItemDetailsPage;
