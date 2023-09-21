import React from "react";
import { Spinner } from "react-bootstrap";
import '../App.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner animation="border" role="status" id="loader">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
};

export default Loader;
