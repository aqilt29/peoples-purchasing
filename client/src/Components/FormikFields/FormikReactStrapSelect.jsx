import React, { useEffect } from 'react';
import _ from 'lodash';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";


const FormikReactStrapSelect = ({ field, form: { touched, errors }, ...props }) => {
    let error = _.get(touched, field.name);
    let touch = _.get(touched, field.name);

    return (
        <FormGroup>
            <Label for={props.id} className={"label-color"}>{props.label}</Label>
            <Input id={props.id} {...field} {...props} type="select"
                   invalid={Boolean(touched[field.name] && errors[field.name])}>
                <option value="">{props.defaultOption}</option>
                {props.options.map((option, index) => {
                    if (option.name)
                        return (<option value={option.id} key={index}>{option.name}</option>);
                    return (<option value={option} key={index}>{option}</option>)
                })}
            </Input>
            {console.log(error)}
            {touch && error && <FormFeedback>{error}</FormFeedback>}
        </FormGroup>
    )
};

export default FormikReactStrapSelect;
