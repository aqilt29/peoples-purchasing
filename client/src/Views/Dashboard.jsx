import React from 'react';
import { Container, CardColumns } from 'reactstrap';
import AppCard from '../Components/AppCard';
import { useAuth0 } from '../react-auth0-spa';

import { userDashboardApps } from '../utils/userPermissions';

console.log(userDashboardApps);

const Dashboard = () => {
  const { dbUser: { role } } = useAuth0();

  console.log(userDashboardApps[role]);

  return (
    <Container>
      <h3>Dashboard</h3>
      <div>
      <CardColumns>
        {
          userDashboardApps[role].map((app, idx) => {
            return <AppCard {...app} key={`${idx}`} />
          })
        }
      </CardColumns>
      </div>
    </Container>
  );
};
export default Dashboard;
