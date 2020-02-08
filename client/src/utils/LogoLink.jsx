import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarLogo } from '../Styles';

const LogoUrl = 'https://peoplesorangecounty.com/wp-content/themes/peoples2020/images/peoples_logo.png';

const LogoLink = () => {
  return (
    <>
      <NavLink to="/">
        <NavbarLogo src={LogoUrl} />
      </NavLink>
    </>
  )
}

export default LogoLink;
