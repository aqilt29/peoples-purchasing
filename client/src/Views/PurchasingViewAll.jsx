import React, { useEffect, useState } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { getAllRequestsByUser } from '../api/requestApi';
import Loading from '../Components/Loading';
import { Container, Row, Col, Table } from 'reactstrap';
import RequestListItem from '../Components/RequestListItem';
import RequestList from '../Components/RequestList';

const PurchasingViewAll = () => {
  const { dbUser } = useAuth0()
  const [isLoading, setLoading] = useState(false);
  const [requestData, setData] = useState([])

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      const { data } = await getAllRequestsByUser(dbUser);
      setData(data);
      setLoading(false);
      console.log(data)
    }
    fn()
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      <RequestList
        listOfRequests={requestData}
      />
    </>
  )
};

export default PurchasingViewAll;
