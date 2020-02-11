import React, { useState } from 'react';
import { Container, CardGroup, CardColumns, CardDeck, Col } from 'reactstrap';
import AppCard from '../Components/AppCard';

const Dashboard = () => {

  return (
    <Container>
      <h3>Dashboard</h3>
      <div>
      <CardColumns>
        <AppCard />
      </CardColumns>
      </div>
    </Container>
  );
};
export default Dashboard;
