import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Label, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { BlueButton } from '../Styles'
import AsyncSelect from 'react-select/async';
import { getValidReqs, getRequestById } from '../api/requestApi';
import ItemList from '../Components/requestForms/ItemList';
import { submitPO } from '../api/purchaseOrderApi';
import { useAuth0 } from '../react-auth0-spa';

const CreatePurchaseOrder = () => {
  const [selectedPrs, setSelectedPrs] = useState([]);
  const [requestsToRender, setRequestsToRender] = useState([]);
  const { dbUser: { _id } } = useAuth0()



  useEffect(() => {

    const fn = async () => {

      if (selectedPrs) {
        const prInfoToRender = [];

        await selectedPrs.forEach(async ({ label, value }) => {
          let data;

          try {

            data = await getRequestById(value);
            prInfoToRender.push(data.data)
            setRequestsToRender(prInfoToRender.flat())

          } catch (error) {

            console.error(error)
            window.alert(error)

          }

        })
      } else if (!selectedPrs) {
        setRequestsToRender([])
      }

    }

    fn()
  },[selectedPrs])

  const submitPurchaseOrder = async (_, data) => {
    const purchaseRequests = selectedPrs.map(({ value }) => value)

    let successData;
    try {
      successData = await submitPO({ ...data, purchaseRequests, user: _id })
    } catch (error) {
      window.alert(error)
      console.error(error)
    }

    console.log(successData)

  };

  const mapApiDataForSelect = (apiResults) => {
    return apiResults.map(({ _id }) => {
      return { label: _id.slice(-5).toUpperCase(), value: _id }
    })
  };

  const getValidPRs = async (inputValue) => {
    let apiData;

    try {
      apiData = await getValidReqs(inputValue)
    } catch (error) {
      console.error(error)
    }

    const options = mapApiDataForSelect(apiData)

    return options
  }

  return (
    <>
      <h3>Create PO</h3>
      <Container>
        {/* Row for entering in PO info */}
        <AvForm onValidSubmit={submitPurchaseOrder} >
          <Row>
            <Col>
              <h5>PO Information</h5>
                <Row>
                  <Col>
                    <AvField
                      required
                      type="number"
                      name="purchaseOrderId"
                      label="Purchase Order Number:"
                      placeholder="PO-1234"
                      helpMessage="Numbers Only"
                    />
                  </Col>
                  <Col>
                  <AvGroup>
                    <div className="mb-2">
                      <div>
                        <Label>Invoice Total:</Label>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <AvInput
                          required
                          pattern='[0-9]{0,5}'
                          type="number"
                          name="invoiceAmount"
                          min={0}
                          placeholder="420.50"
                        />
                      </div>
                    </div>
                  </AvGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <AvField
                      required
                      type="date"
                      name="dateOrdered"
                      label="Order Placement Date:"
                    />
                  </Col>
                  <Col>
                    <AvField
                      required
                      type="date"
                      name="deliveryDate"
                      label="Expected Delivery Date:"
                    />
                  </Col>
                </Row>
                <BlueButton>Submit PO</BlueButton>
              </Col>
              <Col>
                <h5>Search & Add Purchase Requisitions</h5>
                <Row>
                  <Col>
                    <AsyncSelect
                      isMulti
                      onChange={(data, _) => setSelectedPrs(data)}
                      loadOptions={getValidPRs}
                    />
                  </Col>
                </Row>
                <Row></Row>
              </Col>
          </Row>
        </AvForm>
        <hr />
        <Row>
          <Col>
            <h5>Items on Selected PR's:</h5>
            {
              requestsToRender.length > 0 && requestsToRender.map((request, idx) => {
                return (
                  <div key={idx}>
                    <h5>{request._id.slice(-5).toUpperCase()} Items:</h5>
                    <ItemList
                      documentId={request._id}
                      {...request}
                      detailsPage
                    />
                  </div>
                )
              })
            }
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default CreatePurchaseOrder;