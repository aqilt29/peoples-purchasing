import React, { useEffect } from 'react';
import _ from 'lodash';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";


const FormikReactStrapSelect = ({ field, form: { touched, errors }, options, ...props }) => {
    let error = _.get(touched, field.name);
    let touch = _.get(touched, field.name);

    return (
        <FormGroup>
            <Label for={props.id} className={"label-color"}>{props.label}</Label>
            <Input id={props.id} {...field} {...props} type="select"
                   invalid={Boolean(touched[field.name] && errors[field.name])}>
                <option value="">{props.placeholder}</option>
                {options.map((option, index) => {
                    if (option.label)
                        return (<option value={option.value} key={index}>{option.label}</option>);
                    return (<option value={option} key={index}>{option}</option>)
                })}
            </Input>
            {touch && error && <FormFeedback>{_.get(errors, field.name)}</FormFeedback>}
        </FormGroup>
    )
};

export default FormikReactStrapSelect;
