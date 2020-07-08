import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Table } from 'reactstrap';
import { searchRequestById, getAllRequests } from '../api/requestApi';
import Loading from '../Components/Loading';
import RequestListItem from '../Components/RequestListItem';
import RequestList from '../Components/RequestList';

/**
 * This component at some time in the future needs to
 * be able to search the PRs and somehow sort them.
 */

const PurchasingAllByCompany = () => {
  const [foundRequests, setFoundRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true)

      let allRequests;

      try {
        allRequests = await getAllRequests();
        setFoundRequests(allRequests)
      } catch (error) {
        console.log(error)
        window.alert(error)
      }

      setIsLoading(false)
    }

    fn()
  }, [])

  const searchForRequests = async (_, { lookupId }) => {
    setIsLoading(true)
    const results =  await searchRequestById(lookupId);
    setFoundRequests(results);
    setIsLoading(false)
  };

  if (isLoading) return <Loading />

  return (
    <>
      <RequestList
        listOfRequests={foundRequests}
      />
    </>
  )
};

export default PurchasingAllByCompany;