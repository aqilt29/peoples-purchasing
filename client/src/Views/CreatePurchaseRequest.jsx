import React, { useState, useEffect } from 'react';
import {
  RequestHeaderForm,
  RequestItemsForm,
  RequestPreview,
} from '../Components/PurchaseRequestForms';
import FormikStepper from '../Components/FormikHelpers/FormikStepper';
import { headerValidators } from '../utils/FormValidators';
import { FormikStep } from '../Components/FormikHelpers';
import { getAllEntities } from '../api/entitiesApi';


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


const exampleListOfEntities = [
  'New Patriot Holdings',
  'Peoples Retail - Santa Ana',
  'Peoples Retail - Los Angeles',
  'Peoples Retail - Riverside',
];



const CreatePurchaseRequest = () => {
  const [loading, setLoading] = useState(false);
  const [entitiesList, setEntitiesList] = useState([])

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      let entities = [];
      try {
        entities = await getAllEntities();
        console.log(entities);
      } catch (error) {
        window.alert(error);
      }

      setEntitiesList(entities);

      setLoading(false);
    };

    fn()
  }, [])


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
    needBuyer: undefined,
    itemToAdd: {
      description: '',
      specialDetails: '',
      expenseCategory: '',
      price: '',
      requestByDate: '',
      unitOfMeasure: '',
      link: '',
      quantity: '',
      receivedQty: '',
      invoicedQty: '',
    },
    items: [{
      description: '',
      specialDetails: '',
      expenseCategory: '',
      price: '',
      requestByDate: '',
      unitOfMeasure: '',
      link: '',
      quantity: '',
      receivedQty: '',
      invoicedQty: '',
    }],
    friends: [{ name: 'richie', age: 23 }],
    hellow: 'world',
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
        <FormikStep validationSchema={headerValidators}>
          <RequestHeaderForm />
        </FormikStep>
        <FormikStep onSubmit={() => { console.log(world) }}>
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



