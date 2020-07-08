import React from 'react';
import _ from 'lodash';
import { FormGroup, Input, Label, FormFeedback } from "reactstrap";

const FormikReactStrapRadio = ({
      field,
      form: { setFieldValue, touched, errors, values},
      ...props
  }) => {
    return (
        <FormGroup check inline>
            <Label for={props.id}>
                <Input invalid={Boolean(_.get(touched, field.name) && _.get(errors, field.name))} {...props} type="radio" name={field.name} checked={values[field.name] === field.value} value={field.value}
                       onChange={(event, value) => setFieldValue(field.name, field.value)}/>
                {props.label}
                {_.get(touched, field.name) && _.get(errors, field.name) ? <FormFeedback>{_.get(errors, field.name)}</FormFeedback> : ''}
            </Label>
        </FormGroup>
    )
};

export default FormikReactStrapRadio;