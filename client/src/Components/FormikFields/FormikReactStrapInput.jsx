import React from 'react';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import _ from 'lodash'

const FormikReactStrapInput = (
    {
        field: {...fields},
        form: {touched, errors, ...rest},
        ...props
    }) => (
    <FormGroup>
        <Label for={props.id} className={"label-color"}>{props.label}</Label>
        <Input {...props} {...fields} invalid={Boolean(_.get(touched, fields.name) && _.get(errors, fields.name))}/>
        {_.get(touched, fields.name) && _.get(errors, fields.name) ? <FormFeedback>{_.get(errors, fields.name)}</FormFeedback> : ''}
    </FormGroup>
);
export default FormikReactStrapInput;