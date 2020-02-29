import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getRequestById } from '../api/requestApi';
import Loading from '../Components/Loading';
import { Container, Col, Row } from 'reactstrap'

const PurchaseReqDetails = (props) => {
  const { params: { id } } = useRouteMatch();
  const [request, setRequest] = useState(null);
  const [isLoading, setLoading] = useState(false);


  console.log(id)
  console.log(props)

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      let data;

      try {
        data = await getRequestById(id);
        console.log(data)
        setRequest(data.data);
      } catch (error) {
        setLoading(false);
        window.alert(error)
      }
      setLoading(false);
    }

    if (!request) {
      fn()
    }
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      <h3>Requisition Details</h3>
      <h4>Id: {id.slice(-5).toUpperCase()}</h4>
      <Container>
        <Row>
          {/* row for header details */}
        </Row>
        <Row>
          {/* row for uploading and information on that */}
        </Row>
        <Row>
          {/* row for approval information */}
        </Row>
      </Container>
      <hr />
      <code>{JSON.stringify(request, null, 2)}</code>
    </>
  )
}

export default PurchaseReqDetails;


//  this app is supposed to display all the details of the pR
//  and give the user the ability to modify some of the items on it
//  and the details on the pr

