import React from 'react';
import { Container, CardColumns } from 'reactstrap';
import AppCard from '../Components/AppCard';
import { listOfVendorApps } from '../utils/lists'

const VendorApps = () => {

  return (
    <Container>
      <h3>Purchasing</h3>
      <div>
      <CardColumns>
        {
          listOfVendorApps.map((app, idx) => {
            return <AppCard {...app} key={`${idx}`}/>
          })
        }
      </CardColumns>
      </div>
    </Container>
  )
};

export default VendorApps;
