import React from 'react';
import { GoldButton } from '../../Styles';
import { Link } from 'react-router-dom';

const RequestDone = (props) => {
  console.log(props)
  return (
    <>
      <h6>Success</h6>
      <h6>Approver List:</h6>
      {
        props.successData.approverList.map(({email}, idx) => {
          return <h5>{idx + 1} {JSON.stringify(email)}</h5>
        })
      }
      <GoldButton tag={Link} to={`/purchasing/view/${props.successData._id}`}>Attach Documents</GoldButton>
    </>
  )
};

export default RequestDone;
