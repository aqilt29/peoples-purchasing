import React, { useState } from 'react';
import {
  RequestHeaderForm,
  RequestItemsForm,
  RequestPreview,
} from '../Components/PurchaseRequestForms';
import { Formik, Field, FieldArray, Form } from 'formik';
import { Container } from 'reactstrap';
import { BlueButton, GoldButton } from '../Styles';
import { ReactstrapInput } from 'reactstrap-formik';
import * as yup from 'yup';

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

const validationSchema = yup.object()
  .shape({
    project: yup
      .string()
      .required('Required!'),
    // deliveryAddress: yup.object().shape({
    //   streetAddressLine: yup.string().required('We need to send it somewhere!'),
    //   streetAddressLine2: yup.string(),
    //   city: yup.string().required('City Required!'),
    //   state: yup.string().required('State Required!'),
    //   zipCode: yup.string().required('ZipCode Required!'),
    // }),
  })


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
      return <RequestHeaderForm values={values} errors={errors} touched={touched}/>
    case 1:
      return <RequestItemsForm values={values} errors={errors} touched={touched}/>
    case 2:
      return <RequestPreview values={values} errors={errors} touched={touched}/>
  }
}

const renderButtons = (step, setStep) => {
  const incrementStep = () => setStep(step + 1)
  const decrementStep = () => step > 0 ? setStep(step - 1) : setStep(0)

  switch (step) {
    case 0:
      return <BlueButton onClick={incrementStep}>next</BlueButton>
    case 1:
      return (<div><GoldButton onClick={decrementStep} className="mr-2">Back</GoldButton><BlueButton onClick={incrementStep}>next</BlueButton></div>)
    case 2:
      return <GoldButton onClick={decrementStep}>Back</GoldButton>
  }
};

const CreatePurchaseRequest = () => {
  const [step, setStep] = useState(0)

  const requestData = {
    project: '',
    deliveryAddress: {
      streetAddressLine: '',
      streetAddressLine2: '',
      city: '',
      state: '',
      zipCode: '',
    },
    entity: '',
  }

  return (
    <>
      <Formik
        validateOnBlur
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{ ...requestData }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, errors, touched }) => (
          <Container>
            <Form>
              {renderMultiForm(step, values, errors, touched)}
            </Form>
            {renderButtons(step, setStep)}
          </Container>
        )}
      </Formik>
    </>
  )
};

export default CreatePurchaseRequest;
