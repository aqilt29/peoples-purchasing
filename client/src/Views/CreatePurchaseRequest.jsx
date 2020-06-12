import React, { useState } from 'react';
import {
  RequestHeaderForm,
  RequestItemsForm,
  RequestPreview,
} from '../Components/PurchaseRequestForms';
import { Formik, Field, FieldArray } from 'formik';
import {
  Container,
  Row,
  Col,
  Input,
} from 'reactstrap';
import { BlueButton } from '../Styles';
import { ReactstrapInput } from 'reactstrap-formik';


/**
 * This is going to be a multiform component,
 * The top level component will be a formik form to hold the logic
 *  Subsequent forms will just be steps in the process
 *
 * the function to render a formik form will be useful to pass
 *  values and errors and touched to the components holding the fields.
 *
 *
 * Field validation will control the move forward? need to check?
 *
 */


/**
 * There will be 3 sections of the form
 *
 * <RequestHeaderForm />
 *
 * <RequestItemsForm />
 *
 * <RequestPreview />
 *
 * ~Redirect to Details Page on Success Case~
 *
 */

const renderMultiForm = (step, values, errors, touched) => {
  switch (step) {
    case 0:
      return <RequestHeaderForm />
    case 1:
      return <RequestItemsForm />
    case 2:
      return <RequestPreview />
  }
}


const CreatePurchaseRequest = () => {
  const [step, setStep] = useState(0)
  return (
    <>

    </>
  )
};

export default CreatePurchaseRequest;
