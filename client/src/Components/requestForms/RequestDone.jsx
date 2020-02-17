import React from 'react';

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
    </>
  )
};

export default RequestDone;
