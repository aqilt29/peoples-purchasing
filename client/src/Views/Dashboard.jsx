import React, { useState } from 'react';
import { Container, CardGroup, CardColumns, CardDeck } from 'reactstrap';
import AppCard from '../Components/AppCard';

const Dashboard = () => {
  const [userName, setUserName] = useState(false);

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
