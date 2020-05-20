import React, { useState, useEffect, useReducer } from 'react';
import {
  PurchaseRequestHeaders,
  PurchaseRequestItems,
  PurchaseRequestSubmit
} from '../Components/requestMultiforms/index';

const PRCreationMultiform = ({ location, ...props }) => {

  //  keep track of the steps through the process
  const [step, setStep] = useState(0);
  //  function to move the form ahead of backwards
  const moveForm = (action = 'increment') => setStep(action === 'decrement' ? step - 1 : step + 1);

  //  data collected on the first page of the form for document level data
  const [headers, setHeaders] = useState({});
  //  TODO: there needs to be a way for the default to be the PR thats edited?
  //    perhaps the mechanism is the defaults come from props through <Link /> location state?

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
        step === 0 ? (
          <PurchaseRequestHeaders
            moveForm={moveForm}
            headers={headers}
            setHeaders={setHeaders}
          />
        ) : null
      }
      {
        step === 1 ? (
          <PurchaseRequestItems
            moveForm={moveForm}
          />
        ) : null
      }
      {
        step === 2 ? (
          <PurchaseRequestSubmit
            moveForm={moveForm}
          />
        ) : null
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