import React, {useState} from "react";
import Navigation from './Navigation.jsx';
import Results from './Results.jsx';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import AUTH_TOKEN from '../config.js';
import SelectedTitle from './SelectedTitle.jsx';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Footer from './Footer.jsx'

const Homepage = function(props) {

  const [searchInput, searchedTitle] = useState('');
  const [movies, getMovies] = useState([]);
  const [pageLimit, setLimit] = useState('');
  const [selectedId, setTitleId] = useState(null);
  const [show, setShow] = useState(false);
  const [averageRating, getAverageRating] = useState('');
  const [sorted, sortList] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let id = null;

  const renderSearched = function(title) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${AUTH_TOKEN}&query=${title}`)
    .then(response => {
      getMovies(response.data.results);
    })
    .catch(error => {
      console.log(`${error}: An error has occured while selecting results for ${props.searchInput}`)
    })
  }

  const renderMovies = function() {
    if (sorted === 'rating') {
      movies.sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1)
    }
    if (sorted === 'year') {
      movies.sort((a, b) => (Number(a.release_date.slice(0, 4)) < Number(b.release_date.slice(0, 4))) ? 1 : -1)
    }
    return (
      movies.map((movie, i) => (
        <Row id="background" key={i} style={{padding: "25px"}} >
          <Col xs={3}>
            <img height="200" width="200" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              onClick={id = movie.id} key={i}/>
          </Col>
          <Col style={{fontFamily: "sans-serif", textTransform:
            "uppercase", letterSpacing: "2px", paddingTop: "25px", backgroundColor: "#d1d7e0",
             borderRadius: "15px", fontWeight: "bold"}}>
            <Row style={{paddingBottom: "25px", alignItems: "center", display: "flex",
              justifyContent: "center"}}>{`${movie.title} - ${movie.release_date.slice(0, 4)}`}</Row>
            <Row style={{paddingBottom: "25px", alignItems: "center", display: "flex",
              justifyContent: "center"}}>{`Average Rating: ${movie.vote_average}/10`}</Row>
            <Row style={{paddingLeft: "200px", paddingRight: "200px", paddingBottom: "10px",
              alignItems: "center", display: "flex", justifyContent: "center"}}>
              <SelectedTitle setTitleId={setTitleId} id={id}/>
            </Row>
          </Col>
        </Row>
      ))
    )
  }

  return (
    <div>
      <Navigation sortList={sortList} movies={movies} getMovies={getMovies} renderSearched={renderSearched}
        renderMovies={renderMovies} setLimit={setLimit} pageLimit={pageLimit}/>
      <Results averageRating={averageRating} getAverageRating={getAverageRating}
        renderMovies={renderMovies} movies={movies} getMovies={getMovies}
        setLimit={setLimit} pageLimit={pageLimit}/>
      <Footer/>
    </div>
  )

}

export default Homepage;