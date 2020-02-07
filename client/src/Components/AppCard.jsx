import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { BlueButton } from '../Styles';

const AppCard = ({ title, subtitle, text }) => {
  return (
    <div>
      <Card>
        <CardImg top src="https://picsum.photos/344/150" alt="Card image cap" />
        <CardBody>
          <h5>Purchasing</h5>
          <CardText>Manage purchase requisition requests here</CardText>
          <Link to='/purchasing'>
            <BlueButton>ENTER</BlueButton>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default AppCard;