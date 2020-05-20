import React from 'react'
import { BlueButton, GoldButton } from '../../Styles'

const PurchaseRequestItems = ({ moveForm, ...props}) => {
  return (
    <div>
      <h5>Purchase Request Items</h5>
      <p>
        {Object.keys(props)}
      </p>
      <BlueButton className="mr-2" onClick={() => moveForm('decrement')} >Go Back</BlueButton>
      <GoldButton onClick={moveForm} >Next</GoldButton>
    </div>
  )
}

export default PurchaseRequestItems
