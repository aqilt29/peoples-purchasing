import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequestById } from '../api/requestApi'
import Loading from '../Components/Loading';
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { Container, Row, Col } from 'reactstrap';
import VendorSelect from '../Components/VendorSelect';
import { BlueButton } from '../Styles';
import CreatePurchaseReq from './CreatePurchaseReq';

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
      <h3>Edit PR Details ID: P-{id.slice(-5).toUpperCase()}</h3>
      <Container>
        <CreatePurchaseReq requestToEdit={request} />
      </Container>
    </>
  )

  return (
    <h3>Error</h3>
  )
}

export default EditPurchaseReqDetails;

