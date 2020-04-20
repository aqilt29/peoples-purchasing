import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequestById } from '../api/requestApi'
import Loading from '../Components/Loading';
import { Container } from 'reactstrap';
import CreatePurchaseReq from './CreatePurchaseReq';
import { useAuth0 } from '../react-auth0-spa';

const EditPurchaseReqDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { dbUser } = useAuth0()

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
      <h3>Edit PR Details REQ-{id.slice(-5).toUpperCase()}</h3>
      <Container>
        <CreatePurchaseReq user={dbUser} requestToEdit={request} />
      </Container>
    </>
  )

  return (
    <h3>Error</h3>
  )
}

export default EditPurchaseReqDetails;

