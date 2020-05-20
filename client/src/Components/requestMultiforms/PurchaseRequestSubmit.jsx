import React from 'react'
import { BlueButton } from '../../Styles'

const PurchaseRequestSubmit = ({ moveForm, ...props}) => {
  return (
    <div>
      <h5>Review & Submit</h5>
      <p>
        {Object.keys(props)}
      </p>
      <BlueButton onClick={() => moveForm('decrement')} >Go Back</BlueButton>
    </div>
  )
}

export default PurchaseRequestSubmit
