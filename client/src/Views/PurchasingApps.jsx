import React from 'react';
import { Container, CardColumns } from 'reactstrap';
import AppCard from '../Components/AppCard';
import { listOfPurchasingApps, listOfAdminPurchasingApps } from '../utils/lists';
import { useAuth0 } from '../react-auth0-spa';
import { useRouteMatch } from 'react-router-dom';
import { appPermissions } from '../utils/userPermissions';

const PurchasingApps = () => {
  const { dbUser: { role } } = useAuth0();
  const { path } = useRouteMatch()

  console.log(path.slice(1));
  console.log(role)

  console.log(appPermissions[role][path.slice(1)])
  return (
    <Container>
      <h3>Purchasing</h3>
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

export default PurchasingApps;


/*

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

*/
