import React from 'react';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import _ from 'lodash'

const FormikReactStrapInput = (
    {
        field,
        form: {touched, errors, ...rest},
        ...props
    }) => (
    <FormGroup>
        <Label for={props.id} className={"label-color"}>{props.label}</Label>
        <Input {...props} {...field} invalid={Boolean(_.get(touched, field.name) && _.get(errors, field.name))}/>
        {_.get(touched, field.name) && _.get(errors, field.name) ? <FormFeedback>{_.get(errors, field.name)}</FormFeedback> : ''}
    </FormGroup>
);
export default FormikReactStrapInput;