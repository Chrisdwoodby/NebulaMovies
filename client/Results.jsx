import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import AUTH_TOKEN from '../config.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Homepage from './Homepage.jsx';

const Results = function(props) {

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nextPage, getNextPage] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${AUTH_TOKEN}&language=en-US&page=${page}`)
    .then(response => {
    props.getMovies(response.data.results);
    setLoading(false);
    props.setLimit(response.data.total_pages)
    })
    .catch(error => {
      console.log(`${error}: an error occured while loading movies`);
    })
  }, []);

  const getMoreMovies = function() {
    var next = page + 1;
    setPage(next);
    if (props.pageLimit >= next) {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${AUTH_TOKEN}&language=en-US&page=${next}`)
      .then(response => {
        props.getMovies(props.movies.concat(response.data.results));
      })
      .catch(error => {
        console.log(`${error}: An error has occured while selecting more titles`)
      })
    }
  }


  return (
    <Container>
      <h1>results here</h1>
      {!loading &&
      <>
      {props.renderMovies()}
        <Button onClick={getMoreMovies}>view more</Button>
      </>
      }
    </Container>
  )
}

export default Results;