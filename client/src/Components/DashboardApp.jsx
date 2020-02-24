import React from 'react';
import { Card, CardText, CardBody } from 'reactstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BlueButton } from '../Styles';

const DashboardApp = ({ title }) => {
  let { url } = useRouteMatch()
  if (url === '/') url = '';

  return (
    <>
      <Card>
        <CardBody>
          <h5>{title.toUpperCase()}</h5>
          {/* <CardText>{subtitle}</CardText> */}
          <BlueButton tag={Link} to={`${url}${title}`}>ENTER</BlueButton>
        </CardBody>
        {/* <FontAwesomeIcon icon="link" /> */}
      </Card>
    </>
  );
};

export default DashboardApp;