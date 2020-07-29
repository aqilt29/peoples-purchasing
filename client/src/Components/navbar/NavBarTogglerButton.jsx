import React from 'react';
import styled from 'styled-components';
// import BlueHamburger from '../../Assets/blueHamburger.svg'

import { NavbarToggler } from 'reactstrap';

const NavBarTogglerButton = ({ action, className }) => {
  return (
    <NavbarToggler className={className} onClick={action} />
  )
}

const StyledNavBarTogglerButton = styled(NavBarTogglerButton)`
  background-color: white;
  border: 3px solid #1a4086;
`;


export default StyledNavBarTogglerButton;
