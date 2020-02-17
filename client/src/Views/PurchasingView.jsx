import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../Components/Loading';
import { getRequestById } from '../api/requestApi';

const PurchasingView = () => {
  const { id } = useParams();

  const [isLoading, setLoading] = useState(false);
  const [requestData, setData] = useState([])

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      let data;
      try {
        data = await getRequestById(id);
        setData(data.data);
      } catch (error) {
        setLoading(false);
        window.alert(error)
      }

      setLoading(false);
      console.log(requestData)
    }
    fn()
  }, [])

  if (isLoading) return <Loading />


  return (
    <>
      <h3>Purchase Request Details</h3>
      <p>{id}</p>
    </>
  )
};

export default PurchasingView;
