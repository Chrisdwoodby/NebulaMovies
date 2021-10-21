import React , {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Homepage from './Homepage.jsx';

const Navigation = function(props) {
  const [searchInput, searchedTitle] = useState('');

  const handleSubmit = function() {
    props.renderSearched(searchInput);
    props.renderMovies()
  }


  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll>
          <Nav.Link href="#action1">Home</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            onChange={event => searchedTitle(event.target.value)}
          />
          <Button onClick={handleSubmit} variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;