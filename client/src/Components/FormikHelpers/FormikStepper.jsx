/**
 * This component serves as a wrapper around field content
 * The goal is to have variable steps that have their own validation
 * but the stepper is what holds the one formik component
 * that way there arent multiple formiks and combining their
 * outputs doesnt become crazy complex
 */

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { BlueButton, GoldButton } from '../../Styles';

const FormikStepper = ({ children, ...props }) => {
  const childrenComponentArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChildForm = childrenComponentArray[step];
  const stepValidationSchema = currentChildForm.props.validationSchema;

  const isLastStep = () => step === childrenComponentArray.length - 1;
  // const decrementStep = () => {

  // };


  console.log(props)
  console.log(currentChildForm.props)
  return (
    <Formik
      {...props}
      validationSchema={stepValidationSchema}
      onSubmit={ async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep(isLastStep() ? step : step + 1 )
        }
      }}
    >
    {args => (
      <Form>
        {currentChildForm}
        {console.log(args)}
        {console.log('is last step: ', isLastStep())}
        { step > 0 ? <GoldButton
            onClick={() => setStep(step - 1)}
            className='mr-2'
            >Back
          </GoldButton> : null }
        <BlueButton type="submit">{isLastStep() ? 'Submit' : 'Next' }</BlueButton>
      </Form>
    )}

    </Formik>
  )
};

export default FormikStepper;
