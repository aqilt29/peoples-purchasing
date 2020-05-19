import React, { useState, useEffect, useReducer } from 'react';
import {
  PurchaseRequestHeaders,
  PurchaseRequestItems,
  PurchaseRequestSubmit
} from '../Components/requestMultiforms/index';

const PRCreationMultiform = ({ location, ...props }) => {

  //  keep track of the steps through the process
  const [step, setStep] = useState(0);

  //  data collected on the first page of the form for document level data
  const [headers, setHeaders] = useState({});

  //  the list of items that are organized on the 2nd page of the form
  const [items, itemDispatch] = useReducer((state, { type, payload, itemIndex }) => {
    switch (type) {
      case 'add':
        return [ payload, ...state ];

      case 'remove':
        return state.filter((_, index) => index != itemIndex);

      default:
        return state;
    }
  }, [])

  //  the function responsible for sending the data of the form
  //    and subsequently redirecting you to the PR Details page

  console.log(props, 'props from PRCM')
  console.log(location, 'location from PRCM')

  return (
    <>
      <h3>Create Purchase Requisition</h3>
      {
        step === 0 ? <PurchaseRequestHeaders /> : null
      }
      {
        step === 1 ? <PurchaseRequestItems /> : null
      }
      {
        step === 2 ? <PurchaseRequestSubmit /> : null
      }
    </>
  )
};

export default PRCreationMultiform;


/*
  notes:
    all of the steps need the ability to move forward and backward
    while retaining all the information for data put into it

    with the added ability to be able to make edits to existing documents
    if the document ID is in the path
    route check? location state check?
*/