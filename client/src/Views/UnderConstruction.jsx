import React from 'react';
import { BlueButton } from '../Styles';

const UnderConstruction = ({ history, location }) => {
  return (
    <>
      <h3>Oof, This area isn't Ready yet</h3>
      <br />
      <h3>No match for <code>{location.pathname}</code></h3>
      <p>You should probably head back</p>
      <BlueButton onClick={() => history.goBack()}>
        GO BACK
      </BlueButton>
    </>
  )
};

export default UnderConstruction;
