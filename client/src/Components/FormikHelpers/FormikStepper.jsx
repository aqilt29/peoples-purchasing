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

const FormikStepper = ({ children, ...props }) => {
  const childrenComponentArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChildForm = childrenComponentArray[step];
  const stepValidationSchema = currentChildForm.props.validationSchema;
  const customOnSubmit = currentChildForm.props.onSubmit || false;

  const isLastStep = () => step === childrenComponentArray.length - 1;

  return (
    <Formik
      {...props}
      validationSchema={stepValidationSchema}
      onSubmit={ async (values, helpers) => {
        console.log('submit')
        //  if it is the last step, do the onSubmit passed to component
        if (isLastStep()) {
          await props.onSubmit(values, helpers);

        // if it isn't the last step, and there is a custom onSubmit per the step
        } else if (customOnSubmit !== false) {
          // do that onSubmit... maybe get rid of all the items that don't count?
          await customOnSubmit();
          console.log(helpers)
          //  move to next step
          setStep(isLastStep() ? step : step + 1 )
        //  if it isn't the last step and there is no custom onSubmit...
        } else {
          //  change step ahead
          setStep(isLastStep() ? step : step + 1 )
        }
      }}
    >
    {args => (
      <Form>
        {currentChildForm}
        {console.log('formik props', args)}
        {step > 0 ? <GoldButton onClick={() => setStep(step - 1)} className='mr-2'>Back</GoldButton> : null }
        <BlueButton type="submit">{isLastStep() ? 'Submit' : 'Next' }</BlueButton>
      </Form>
    )}

    </Formik>
  )
};

export default FormikStepper;
