import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import AUTH_TOKEN from '../config.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Homepage from './Homepage.jsx';
import Modal from 'react-bootstrap/Modal'

const SelectedTitle = function(props) {

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [runtime, setRuntime] = useState('');
  const [rating, getRating] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalData = function() {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${AUTH_TOKEN}&language=en-US`)
    .then((response) => {
      console.log("modal");
    })
    .catch((error) => {
      console.log(`${error}: An error occured while selecting your title`);
    })
    axios.get(`http://api.themoviedb.org/3/movie/${props.id}?api_key=${AUTH_TOKEN}&append_to_response=release_dates`)
    .then((response) => {
      console.log(response.data.release_dates.results);
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
      <Button variant="primary" onClick={handleClick}>
        view details
      </Button>
      {!loading &&
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{rating}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    }
    </>
  )
}

export default SelectedTitle;