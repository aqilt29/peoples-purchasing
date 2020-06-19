/**
 * This component serves as a wrapper around field content
 * The goal is to have variable steps that have their own validation
 * but the stepper is what holds the one formik component
 * that way there aren't multiple formik's and combining their
 * outputs doesn't become crazy complex
 */

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { BlueButton, GoldButton } from '../../Styles';
import { Button } from 'reactstrap';

const FormikStepper = ({ children, ...props }) => {
  const childrenComponentArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChildForm = childrenComponentArray[step];
  const stepValidationSchema = currentChildForm.props.validationSchema;
  const customOnSubmit = currentChildForm.props.onSubmit || false;

  const isLastStep = () => step === childrenComponentArray.length - 1;


  console.log(props)
  console.log(currentChildForm.props)
  return (
    <Formik
      {...props}
      validationSchema={stepValidationSchema}
      onSubmit={ async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else if ((customOnSubmit !== false) && (typeof customOnSubmit === "function")) {
          console.log('CUSTOM FUNCTION')
          helpers.resetForm()
        } else {
          setStep(isLastStep() ? step : step + 1 )
        }
      }}
    >
    {args => (
      <Form>
      {console.log(args.values)}
      {console.log(args)}
        {currentChildForm}
        {step > 0 ? <GoldButton onClick={() => setStep(step - 1)} className='mr-2'>Back</GoldButton> : null }
        <BlueButton type="submit">{isLastStep() ? 'Submit' : 'Next' }</BlueButton>
        {step === 1 ? (<Button color ="info" type="button" className="ml-2">{'Add Item'}</Button>) : null }
      </Form>
    )}

    </Formik>
  )
};

export default FormikStepper;
