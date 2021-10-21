import React , {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Homepage from './Homepage.jsx';
import AUTH_TOKEN from '../config.js';
import axios from 'axios';
import miniLogo from '../media/miniLogo.png';

const Navigation = function(props) {
  const [searchInput, searchedTitle] = useState('');

  const handleSubmit = function() {
    props.renderSearched(searchInput);
    props.renderMovies()
  }

  const renderHome = function() {

    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${AUTH_TOKEN}&language=en-US&page=1`)
    .then(response => {
    props.getMovies(response.data.results);
    props.sortList('');
    props.setLimit(response.data.total_pages)
    })
    .catch(error => {
      console.log(`${error}: an error occured while loading movies`);
    })
    props.renderMovies();
  }

  const sortByRating = function() {
    props.sortList('rating');
    props.renderMovies();
  }
  const sortByYear = function() {
    props.sortList('year');
    props.renderMovies();
  }

  return (
    <Navbar id="navigation" expand="lg">
      <Navbar.Brand id="logo" href="#" onClick={renderHome}>
      <img hight="100" width="100" src={miniLogo} />
        Nebula Entertainment
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll>
          <Nav.Link href="#action1" onClick={renderHome}
            style={{paddingRight: "100px"}}>Most Popular</Nav.Link>
          <Nav.Link href="#action2" onClick={sortByRating}
            style={{paddingRight: "100px"}}>Sort by Rating</Nav.Link>
          <Nav.Link href="#action3" onClick={sortByYear}
            style={{paddingRight: "100px"}}>Sort by Year</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search for itles"
            className="mr-2"
            aria-label="Search"
            onChange={event => searchedTitle(event.target.value)}
          />
          <Button id="search" onClick={handleSubmit}>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;