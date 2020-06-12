import React from 'react';
import { Media } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { NavbarLogo } from '../../Styles';

import PeoplesLogo from '../../Assets/PeoplesHoldingsLogo.png'

const NavBarLogo = () => {
  return (
    <>
      <NavLink to="/">
        <NavbarLogo tag="img" src={PeoplesLogo} />
      </NavLink>
    </>
  )
}

export default NavBarLogo;
