import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import AUTH_TOKEN from '../config.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Results = function() {
  const [loading, setLoading] = useState(true);
  const [movies, getMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, getNextPage] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${AUTH_TOKEN}&language=en-US&page=${page}`)
    .then(response => {
    getMovies(response.data.results);
    setLoading(false);
    })
    .catch(error => {
      console.log(`${error}: an error occured while loading movies`);
    })
  }, []);

  const getMoreMovies = function() {
    var next = page + 1;
    setPage(next);
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${AUTH_TOKEN}&language=en-US&page=${page}`)
    .then(response => {
      getMovies(movies.concat(response.data.results));
      console.log(movies)
    })
  }

  const renderMovies = function() {
    return (
      movies.map((movie, key) => (
        <Card key={key}>
          <img height="75" width="75" src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} />
          {movie.title}
        </Card>
      ))
    )
  }

  return (
    <Container>
      <h1>results here</h1>
      {!loading &&
      <>
      {console.log(movies)}
      {renderMovies()}
        <Button onClick={getMoreMovies}>view more</Button>
      </>
      }
    </Container>
  )
}

export default Results;