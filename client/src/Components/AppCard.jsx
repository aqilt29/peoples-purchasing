import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Col, Row,
} from 'reactstrap';
import { Link, useRouteMatch } from 'react-router-dom';

import { BlueButton } from '../Styles';

const AppCard = ({ title, subtitle, link }) => {
  let { url } = useRouteMatch()
  if (url === '/') url = '';

  return (
    <>
      <Card>
        <CardImg top src="https://picsum.photos/344/150" alt="Card image cap" />
        <CardBody>
          <h5>{title}</h5>
          <CardText>{subtitle}</CardText>
          <BlueButton tag={Link} to={`${url}${link}`}>ENTER</BlueButton>
        </CardBody>
      </Card>
    </>
  );
};

export default AppCard;