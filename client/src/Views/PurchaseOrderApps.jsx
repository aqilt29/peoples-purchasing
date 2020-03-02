import React from 'react';
import { Container, CardColumns } from 'reactstrap';
import AppCard from '../Components/AppCard';
import { useAuth0 } from '../react-auth0-spa';
import { useRouteMatch } from 'react-router-dom';
import { appPermissions } from '../utils/userPermissions';

const PurchaseOrderApps = () => {
  const { dbUser: { role } } = useAuth0();
  const { path } = useRouteMatch()

  console.log(path.slice(1));
  console.log(role)

  console.log(appPermissions[role][path.slice(1)])
  return (
    <Container>
      <h3>Purchase Orders</h3>
      <div>
      <CardColumns>
        {
          appPermissions[role][path.slice(1)].map((app, idx) => {
            return <AppCard {...app} key={idx} />
          })
        }
      </CardColumns>
      </div>
    </Container>
  )
};

export default PurchaseOrderApps;