import React from 'react'

const PurchaseRequestHeaders = () => {
  return (
    <>
      <h5>Request Headers</h5>
      <p>
        {JSON.stringify(props)}
      </p>
    </>
  )
}

export default PurchaseRequestHeaders
