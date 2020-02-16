import React from 'react';
import {
  Card, CardImg, CardText, CardBody, Col, Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { BlueButton } from '../Styles';

const AppCard = ({ title, subtitle, link }) => {
  return (
    <>
      <Card>
        <CardImg top src="https://picsum.photos/344/150" alt="Card image cap" />
        <CardBody>
          <h5>{title}</h5>
          <CardText>{subtitle}</CardText>
          <Link to={`${link}`}>
            <BlueButton>ENTER</BlueButton>
          </Link>
        </CardBody>
      </Card>
    </>
  );
};

export default AppCard;