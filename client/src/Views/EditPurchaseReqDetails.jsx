import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequestById } from '../api/requestApi'
import Loading from '../Components/Loading';
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { Container, Row, Col } from 'reactstrap';
import VendorSelect from '../Components/VendorSelect';
import { BlueButton } from '../Styles';

const EditPurchaseReqDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [newVendor, setNewVendor] = useState(null);


  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      let data;

      //  get this particular ID
      try {
        data = await getRequestById(id);
        setRequest(data.data);

      } catch (error) {
        setLoading(false);
        window.alert(error)
      }
      setLoading(false);
    }

    fn()
  }, [])

  console.log(request)

  if (isLoading) return <Loading />

  if (request) return (
    <>
      <h3>Edit PR Details ID: {id.slice(-6).toUpperCase()}</h3>
      <Container>
        <AvForm onValidSubmit={(_, data) => console.log(data)}>
          <Row form>
            <Col md={6}>
              <h4>Vendor:</h4>
              <VendorSelect vendorId={request.vendor._id} vendorChange={setNewVendor} />
            </Col>
            <Col md={6}>suhh</Col>
          </Row>
          <Row form>
            <Col>
              <BlueButton className="my-3">Submit</BlueButton>
            </Col>
          </Row>
        </AvForm>
      </Container>
    </>
  )

  return (
    <h3>Error</h3>
  )
}

export default EditPurchaseReqDetails;

