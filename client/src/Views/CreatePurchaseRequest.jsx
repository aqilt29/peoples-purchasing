import React, { useState } from 'react';
import {
  RequestHeaderForm,
  RequestItemsForm,
  RequestPreview,
} from '../Components/PurchaseRequestForms';
import FormikStepper from '../Components/FormikHelpers/FormikStepper';
import { headerValidators } from '../utils/FormValidators';
import { FormikStep } from '../Components/FormikHelpers';

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
 * Validation for the fields are managed at the form level
 * here we will use
 * {
 *
 * }
 *
 *
 * example list of entities = [
 *
 * ]
 *
 *
 */

const exampleListOfEntities = [
  'New Patriot Holdings',
  'Peoples Retail - Santa Ana',
  'Peoples Retail - Los Angeles',
  'Peoples Retail - Riverside',
];



const CreatePurchaseRequest = () => {
  const requestData = {
    referenceName: '',
    entity: '',
    businessNeed: '',
    shippingAddress: {
      address: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
    },
    needBuyer: false,
  }

  return (
    <>
      <FormikStepper
        validateOnBlur
        initialValues={{ ...requestData }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <FormikStep
          validationSchema={headerValidators}
        >
          <RequestHeaderForm
            hello
            world
            print="line"
          />
        </FormikStep>
        <FormikStep>
          <RequestItemsForm />
        </FormikStep>
        <FormikStep>
          <RequestPreview />
        </FormikStep>
      </FormikStepper>
    </>
  )
};

export default CreatePurchaseRequest;



