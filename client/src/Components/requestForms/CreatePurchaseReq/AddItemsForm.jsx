import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import LedgerSelect from '../../LedgerSelect';
import { BlueButton } from '../../../Styles';
import { listOfClassCodes, listOfUnits } from '../../../utils/lists';
import ItemList from '../ItemList';

export const AddItemsForm = ({ items, addItem, deleteItem, submitNewForm }) => {

  const [isValid, setIsValid] = useState(false)
  const [ledgerAndMaterial, setLedgerAndMaterial] = useState(null)
  const [ledgerIsValid, setLedgerIsValid] = useState(false)
  const [resetSelect, setResetSelect] = useState(false)
  const [saveIsValid, setSaveIsValid] = useState(false);

  const formRef = useRef(null);

  const [isCustomUnits, setIsCustomUnits] = useState(false)

  useEffect(() => {
    //  useEffect to see if all elements are valid to add item
    if(ledgerIsValid) setIsValid(true)
    if(!ledgerIsValid) setIsValid(false)
    if(items.length > 0) setSaveIsValid(true);
    if(items.length < 1) setSaveIsValid(false);
  })

  const handleSubmit = (_, { unitOfMeasure, customUnitOfMeasure, ...data }) => {
    console.log(unitOfMeasure, customUnitOfMeasure)

    if (unitOfMeasure === 'Other' && (!customUnitOfMeasure || customUnitOfMeasure.length < 1)) {
      window.alert('Please Enter Units of Measure');
      return;
    };

    addItem({
      ...ledgerAndMaterial,
      ...data,
      unitOfMeasure: unitOfMeasure === 'Other' ? customUnitOfMeasure : unitOfMeasure,
    });

    //  reset the form here:
    formRef.current.reset()
    // reset the other multi selectors
    setResetSelect(true)

  }

  useEffect(() => {
    if (resetSelect) setResetSelect(false)
  })

  return (
    <>
      <h5>Items Form</h5>
      <Container>
        <AvForm onValidSubmit={handleSubmit} ref={formRef}>
          <h5>Item Details</h5>
          <Row>
            <Col md={6}>
              <LedgerSelect
                setValid={setLedgerIsValid}
                ledgerChange={setLedgerAndMaterial}
                width="100%"
                reset={resetSelect}
              />
            </Col>
            <Col>
              <AvGroup>
                <div className="mb-2">
                  <div>
                    <Label>Unit Price:</Label>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <AvInput
                      required
                      pattern='[0-9]{0,5}'
                      type="number"
                      name="price"
                      min={0}
                    />
                  </div>
                </div>
              </AvGroup>
            </Col>
            <Col>
              <AvField
                type="number"
                label="Item Qty:"
                min="1"
                required
                name='quantity'
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <AvField
              type="text"
              required
              label="Description:"
              name="description"
              placeholder="Please enter item name/description..."
            />
            <AvField
              type="text"
              label="Item Url (if applicable)"
              name='link'
            />
            <Row>
              <Col>
                <AvField
                  type="text"
                  label="Vendor Part Number:"
                  name="vendorPartNumber"
                />
              </Col>
              <Col>
                <AvField
                  type="text"
                  label="Internal Part Number:"
                  name="internalPartNumber"
                />
              </Col>
            </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <AvField
                    type="select"
                    required
                    label="Select Class Code"
                    name='classCode'
                  >
                    <option value="">Select Class Code...</option>
                  {
                    listOfClassCodes.map((unit, idx) => <option key={idx} value={unit}>{unit}</option>)
                  }
                  </AvField>
                </Col>
                <Col>
                  <AvField
                    required
                    type="date"
                    label="Requested Delivery Date:"
                    name='requestByDate'
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="my-3">
                    <AvGroup check>
                      <Label check>
                        <AvInput
                          type="checkbox"
                          name="isDirect"
                          trueValue={true}
                          falseValue={false}
                        />
                        Item is a direct material?
                      </Label>
                    </AvGroup>
                  </div>
                </Col>
                <Col>
                  <AvField
                    type="select"
                    required
                    label="Select Units of Measure"
                    name='unitOfMeasure'
                    onChange={(_, value) => value === 'Other' ? setIsCustomUnits(true) : setIsCustomUnits(false) }
                  >
                    <option value="">Select Unit of Measure...</option>
                    <option value="Other">Other</option>
                  {
                    listOfUnits.map(({ label, value }, idx) => <option key={idx} value={value}>{label}</option>)
                  }
                  </AvField>
                  <AvField
                    labelHidden={ isCustomUnits ? false : true }
                    style={{ visibility: isCustomUnits ? 'visible' : 'hidden' }}
                    name="customUnitOfMeasure"
                    label="Custom Units of Measure:"
                    type="text"
                    placeholder="Enter Custom Units"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <BlueButton disabled={!isValid}>Add Item</BlueButton>
            </Col>
            <Col>
              <BlueButton disabled={!saveIsValid} onClick={submitNewForm}>Review & Save Requisition</BlueButton>
            </Col>
          </Row>
        </AvForm>
        <hr />
        <Row>
          <Col>
            <h5>Items List</h5>
            <ItemList items={items} deleteItem={deleteItem} />
          </Col>
        </Row>
      </Container>
    </>
  )
};

