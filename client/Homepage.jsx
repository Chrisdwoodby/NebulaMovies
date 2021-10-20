import React from 'react';
import Navigation from './Navigation.jsx';
import Results from './Results.jsx';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Homepage = function() {
  return (
    <>
      <Navigation/>
      <Results/>
    </>
  )
}

export default Homepage;