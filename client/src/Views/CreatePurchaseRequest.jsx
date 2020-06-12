import React, { useState } from 'react';
import {
  RequestHeaderForm,
  RequestItemsForm,
  RequestPreview,
} from '../Components/PurchaseRequestForms';
import { Formik, Field, FieldArray, Form } from 'formik';
import { Container } from 'reactstrap';
import { BlueButton } from '../Styles';
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
    // entity: yup
    //   .string()
    //   .oneOf(exampleListOfEntities)
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


const CreatePurchaseRequest = () => {
  const [step, setStep] = useState(0)

  const requestData = {
    project: '',
    deliveryAddress: {
      street: '',
      city: '',
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
          </Container>
        )}
      </Formik>
    </>
  )
};

export default CreatePurchaseRequest;
