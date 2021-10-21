import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import AUTH_TOKEN from '../config.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Homepage from './Homepage.jsx';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SelectedTitle = function(props) {

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [runtime, setRuntime] = useState('');
  const [rating, getRating] = useState('');
  const [genre, setGenre] = useState('');
  const [poster, setPosterPath] = useState('');
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalData = function() {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${AUTH_TOKEN}&language=en-US`)
    .then((response) => {
      console.log("modal", response);
      setRuntime(response.data.runtime + ' Minutes');
      setPosterPath(response.data.poster_path);
      setTitle(response.data.title);
      setOverview(response.data.overview);
      let genreList = '';
      for (let i = 0; i < response.data.genres.length; i++) {
        if (!genreList.length) {
          genreList += response.data.genres[i].name
        } else {
          genreList += (', ' + response.data.genres[i].name)
        }
      }
      setGenre(genreList);
    })
    .catch((error) => {
      console.log(`${error}: An error occured while selecting your title`);
    })
    axios.get(`http://api.themoviedb.org/3/movie/${props.id}?api_key=${AUTH_TOKEN}&append_to_response=release_dates`)
    .then((response) => {
      for (let i = 0; i < response.data.release_dates.results.length; i++) {
        if (response.data.release_dates.results[i].iso_3166_1 === 'US') {
          getRating(response.data.release_dates.results[i].release_dates[0].certification);
        }
      }
      setLoading(false);
    })
    .catch((error) => {
      console.log(`${error}: An error occured while selecting your title`)
    })
  }

  const handleClick = function() {
    modalData();
    handleShow();
  }

  return (
    <>
      <Button onClick={handleClick} style={{border: "none", backgroundColor: "#802bb1"}}>
        view details
      </Button>
      {!loading &&
      <Modal className="special_modal" size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title id="title">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Row><img height="400" width="400" src={`https://image.tmdb.org/t/p/w500/${poster}`}/></Row>
            </Col>
            <Col>
              <Row id="description">{overview}</Row>
              <Row id="runtime">{runtime}</Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Row style={{paddingRight: "50px"}}>{`Rated ${rating} | ${genre}`}</Row>
          <Button id="search" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    }
    </>
  )
}

export default SelectedTitle;