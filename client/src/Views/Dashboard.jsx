import React, { useState } from 'react';
import { Container, CardGroup, CardColumns, CardDeck, Col } from 'reactstrap';
import AppCard from '../Components/AppCard';
import { useAuth0 } from '../react-auth0-spa';
import { listOfApps, listOfAdminApps } from '../utils/lists';

import { userPermissions } from '../utils/userPermissions';

console.log(userPermissions)

const Dashboard = () => {
  const { dbUser: { role } } = useAuth0();

  return (
    <Container>
      <h3>Dashboard</h3>
      <div>
      <CardColumns>
        {
          role === 'Admin' ? listOfAdminApps.map((app, idx) => {
            return <AppCard {...app} key={`${idx}`}/>
          }) : null
        }
        {
          listOfApps.map((app, idx) => {
            return <AppCard {...app} key={`${idx}`}/>
          })
        }
      </CardColumns>
      </div>
    </Container>
  );
};
export default Dashboard;
