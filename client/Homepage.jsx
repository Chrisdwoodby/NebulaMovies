import React, {useState} from "react";
import Navigation from './Navigation.jsx';
import Results from './Results.jsx';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import AUTH_TOKEN from '../config.js';
import Card from 'react-bootstrap/Card';
import SelectedTitle from './SelectedTitle.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

const Homepage = function(props) {

  const [searchInput, searchedTitle] = useState('');
  const [movies, getMovies] = useState([]);
  const [pageLimit, setLimit] = useState('');
  const [selectedId, setTitleId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let id = null;

  const renderSearched = function(title) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${AUTH_TOKEN}&query=${title}`)
    .then(response => {
      getMovies(response.data.results);
      console.log(response.data)
    })
    .catch(error => {
      console.log(`${error}: An error has occured while selecting results for ${props.searchInput}`)
    })
  }

  const renderMovies = function() {
    return (
      movies.map((movie, i) => (
        <Card key={i} >
          <img height="75" width="75" src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} onClick={id = movie.id} key={i}/>
          {movie.title}
          {movie.release_date}
          <SelectedTitle setTitleId={setTitleId} selectedId={selectedId} id={id}/>
        </Card>
      ))
    )
  }

  return (
    <>
      <Navigation renderSearched={renderSearched} renderMovies={renderMovies} />
      <Results renderMovies={renderMovies} movies={movies} getMovies={getMovies} setLimit={setLimit} pageLimit={pageLimit}/>
    </>
  )

}

export default Homepage;