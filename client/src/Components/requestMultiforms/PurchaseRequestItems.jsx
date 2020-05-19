import React from 'react'

const PurchaseRequestItems = (props) => {
  return (
    <div>
      <h5>Purchase Request Items</h5>
      <p>
        {JSON.stringify(props)}
      </p>
    </div>
  )
}

export default PurchaseRequestItems
