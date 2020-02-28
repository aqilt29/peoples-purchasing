import React from 'react';
import { BlueButton } from '../../../Styles';
import { Redirect } from 'react-router-dom';

export const ReqSummary = ({ decrementStep, successData,...reqData }) => {

  console.log(Object.keys(reqData))
  console.log(successData._id)

  return (
    <>
      <Redirect to={`/purchasing/details/${successData._id}`} />
      <BlueButton onClick={decrementStep} >Go Back</BlueButton>
    </>
  )
};

