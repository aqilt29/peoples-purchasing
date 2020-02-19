import React from 'react';
import { Container, CardColumns } from 'reactstrap';
import AppCard from '../Components/AppCard';
import { listOfPurchasingApps, listOfAdminPurchasingApps } from '../utils/lists';
import { useAuth0 } from '../react-auth0-spa';

const PurchasingApps = () => {
  const { dbUser: { role } } = useAuth0();

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
        {
          role === 'Admin' ? listOfAdminPurchasingApps.map((app, idx) => {
            return <AppCard {...app} key={`${idx}`}/>
          }) : null
        }
      </CardColumns>
      </div>
    </Container>
  )
};

export default PurchasingApps;
