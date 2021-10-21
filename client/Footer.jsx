import React from 'react';
import Logo from '../media/Logo.png';
import Container from 'react-bootstrap/Container';

const Footer = function() {
  return (
    <div id="footer">
      <img id="footerLogo" height="300" width="300" src={Logo}/>
    </div>
  )
}

export default Footer