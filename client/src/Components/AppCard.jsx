import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Col, Row,
} from 'reactstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BlueButton } from '../Styles';

const AppCard = ({ title, subtitle, link }) => {
  let { url } = useRouteMatch()
  if (url === '/') url = '';

  return (
    <>
      <Card>
        <CardBody>
          <h5>{title}</h5>
          <CardText>{subtitle}</CardText>
          <BlueButton tag={Link} to={`${url}${link}`}>ENTER</BlueButton>
        </CardBody>
        {/* <FontAwesomeIcon icon="link" /> */}
      </Card>
    </>
  );
};

export default AppCard;