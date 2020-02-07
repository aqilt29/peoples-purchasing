import React from 'react';
import styled from 'styled-components';

import { NavbarToggler } from 'reactstrap';

const NavBarTogglerButton = ({ action, className }) => {
  return (
    <NavbarToggler className={className} onClick={action} />
  )
}

const StyledNavBarTogglerButton = styled(NavBarTogglerButton)`
  background-color: white;
  border: 3px solid #1a4086;

  & > .navbar-toggler-icon {
    background-color: white;
    background-image: url(./blueHamburger.svg);
  }
`;


export default StyledNavBarTogglerButton;
