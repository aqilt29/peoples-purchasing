import React from 'react';
import { Container, CardColumns } from 'reactstrap';
import AppCard from '../Components/AppCard';
import { listOfPurchasingApps } from '../utils/lists';

const PurchasingApps = () => {
  return (
    <Container>
      <h3>Purchasing</h3>
      <div>
      <CardColumns>
        {
          listOfPurchasingApps.map((app, idx) => {
            return <AppCard {...app} key={`${idx}`}/>
          })
        }
      </CardColumns>
      </div>
    </Container>
  )
};

export default PurchasingApps;
