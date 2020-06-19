import React from 'react';
import { Field, FieldArray, useFormikContext, Form } from 'formik';
import { Col, Row, Button } from 'reactstrap';
import { FormikReactStrapInput, FormikReactStrapSelect } from '../FormikFields';
import { ItemsCart } from '.';

const itemFields = [
  'description',
  'specialDetails',
  'expenseCategory',
  'price',
  'requestByDate',
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
  const { values, setFieldValue, ...rest } = useFormikContext()
  console.log(values, rest)

  return (
    <>
      <FieldArray
          name="items"
          render={arrayHelpers => (
            <div>
              <Row>
                <Col>
                  <h3>Add Items to Purchase</h3>
                  <div>
                    <Field label="Item Name/Description" name={'itemToAdd.description'} placeholder="Hand Sanitizer, Cabinets..." component={FormikReactStrapInput}/>
                    <Field label="Special Details" placeholder="Special Instructions or Use Case for Item" name={'itemToAdd.specialDetails'} component={FormikReactStrapInput}/>
                    <Field label="Online URL" placeholder="www.amazon.com/..." name={'itemToAdd.link'} component={FormikReactStrapInput}/>
                    <Field label="Expense Category/Dept" name={'itemToAdd.expenseCategory'} defaultOption="Select..." options={expenseCategoryList} component={FormikReactStrapSelect}/>
                    <Field label="Unit Price" name={'itemToAdd.price'} type="number" placeholder="$100.00" component={FormikReactStrapInput}/>
                    <Field label="Quantity" name={'itemToAdd.quantity'} type="number" placeholder="10" component={FormikReactStrapInput}/>
                  </div>
                  <Button
                    className="mb-2"
                    color="info"
                    type="button"
                    onClick={() => {
                      itemFields.forEach((field) => setFieldValue(`itemToAdd.${field}`, ''))
                      arrayHelpers.push(values.itemToAdd)
                    }}
                  >
                    {'Add Item'}
                  </Button>
                </Col>
                <Col>
                  <h3>Items List...</h3>
                  <ItemsCart items={values.items} arrayHelpers={arrayHelpers}/>
                </Col>
              </Row>
            </div>
          )}
      />
    </>
  )
};

export default RequestItemsForm;
