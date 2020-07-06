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
import { createNewRequest } from '../api/requestApi';
import { useAuth0 } from '../react-auth0-spa';


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
  const { dbUser } = useAuth0()

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


  //  function to submit and then call the loader
  const submitNewRequest = async (formData) => {

    let submissionResponse = null;
    setLoading(true)

    formData.invoiceTotal = formData.items.reduce((acc, curr) => acc += (curr.price * curr.quantity), 0);
    formData.user = dbUser._id

    try {
      //  try to submit the new request
      submissionResponse = await createNewRequest(formData);
      console.log('success')
    } catch (error) {
      //  else notify the use of the error
      window.alert(error)
    }

    setLoading(false)
  }

  //  the formik model needs an object for initial values
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
    itemToAdd: {
      description: '',
      specialDetails: '',
      expenseCategory: '',
      price: '',
      link: '',
      quantity: '',
    },
    items: [],
  }

  return (
    <>
      <FormikStepper
        validateOnBlur
        initialValues={{ ...requestData }}
        onSubmit={submitNewRequest}
      >
        <FormikStep validationSchema={headerValidators}>
          <RequestHeaderForm />
        </FormikStep>
        <FormikStep>
          <RequestItemsForm />
        </FormikStep>
        <FormikStep>
          <RequestPreview entitiesList={entitiesList} />
        </FormikStep>
      </FormikStepper>
    </>
  )
};

export default CreatePurchaseRequest;



