import React from 'react';
import { NavLink } from 'react-router-dom';

import PeoplesLogoSvg from '../../Assets/PeoplesHoldingsLogo.svg'

const NavBarLogo = () => {
  return (
    <>
      <NavLink to="/">
        <img style={{ width: '100px'}} src={PeoplesLogoSvg} />
      </NavLink>
    </>
  )
}

export default NavBarLogo;
