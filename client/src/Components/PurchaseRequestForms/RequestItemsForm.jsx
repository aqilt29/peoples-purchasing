import React from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { Col, Row, Button } from 'reactstrap';
import { FormikReactStrapInput, FormikReactStrapSelect } from '../FormikFields';
import { ItemsCart } from '.';
import { itemValidation } from '../../utils/FormValidators';

const itemFields = [
  'description',
  'specialDetails',
  'expenseCategory',
  'price',
  'unitOfMeasure',
  'link',
  'quantity',
  'receivedQty',
  'invoicedQty',
];

const expenseCategoryList = [
  'Raw Material',
  'Fixed Asset',
  'Facility Utilities & Services',
  'Repairs & Maintenance',
  'Store & Office Supplies',
  'Lab Supplies',
  'Warehouse Supplies',
  'Manufacturing Supplies',
  'Marketing & Advertising',
  'Licensing & Compliance',
  'Professional Services',
  'IT/Networking',
];

const RequestItemsForm = () => {
  const { values, errors, setFieldValue, setFieldError, ...rest } = useFormikContext()

  return (
    <>
      <FieldArray
          name="items"
          render={arrayHelpers => (
            <div>
              <Row>
                <Col>
                  <h3>Add Items to Purchase</h3>
                  <p>Please fill out all fields, or entry is invalid.</p>
                  <div>
                    <Field
                      label="Item Name/Description"
                      name={'itemToAdd.description'}
                      placeholder="Hand Sanitizer, Cabinets..."
                      component={FormikReactStrapInput}
                    />
                    <Field
                      label="Special Details"
                      placeholder="Special Instructions or Use Case for Item"
                      name={'itemToAdd.specialDetails'}
                      component={FormikReactStrapInput}
                    />
                    <Field
                      label="Online URL"
                      placeholder="www.amazon.com/..."
                      name={'itemToAdd.link'}
                      component={FormikReactStrapInput}
                    />
                    <Field
                      label="Expense Category/Dept"
                      name={'itemToAdd.expenseCategory'}
                      placeholder="Select..."
                      options={expenseCategoryList}
                      component={FormikReactStrapSelect}
                    />
                    <Field
                      label="Unit Price"
                      name={'itemToAdd.price'}
                      type="number"
                      placeholder="$100.00"
                      component={FormikReactStrapInput}
                    />
                    <Field
                      label="Quantity"
                      name={'itemToAdd.quantity'}
                      type="number"
                      placeholder="10"
                      component={FormikReactStrapInput}
                    />
                  </div>
                  <Button
                    className="mb-2"
                    color="info"
                    type="button"
                    onClick={async () => {
                      console.log('clicked')
                      let valid;

                      //  try to see if the object is valid
                      try {
                        //  check the object is valid
                        valid = await itemValidation.validate(values.itemToAdd, { abortEarly: false })
                        console.log(valid, 'validate result')

                        //  clear the form
                        itemFields.forEach((field) => setFieldValue(`itemToAdd.${field}`, ''))

                        //  add it to the itemsList
                        arrayHelpers.push(values.itemToAdd)

                      } catch(error) {
                        //  else do not add it to the list and window error it
                        window.alert(error.errors.join(' / '))
                      }

                    }}
                  >
                    {'Add Item'}
                  </Button>
                </Col>
                <Col>
                  <h3>Items List...</h3>
                  <ItemsCart
                    items={values.items}
                    arrayHelpers={arrayHelpers}
                  />
                </Col>
              </Row>
            </div>
          )}
      />
    </>
  )
};

export default RequestItemsForm;
