import React from "react";
import { Container, CardColumns } from "reactstrap";
import { listOfUserApps } from "../utils/lists";
import AppCard from '../Components/AppCard';
import { useRouteMatch } from "react-router-dom";

const Users = () => {

  const { url } = useRouteMatch();
  return (
    <>
    <Container>
      <h4>User Management</h4>
      <div>
        <CardColumns>
          {
            listOfUserApps.map((app, idx) => {
              return <AppCard {...app} url={url} key={`${idx}`}/>
            })
          }
        </CardColumns>
      </div>
    </Container>
    </>
  )
}

export default Users;
