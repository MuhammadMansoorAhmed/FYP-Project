import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Projectform.css";
import Projectform from "./Projectform";

const Projects = ({ state }) => {
  const [showFrom, setShowForm] = useState(false);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  return (
    <>
      <section className="text-center mt-3">
        <Button
          className="btn center-block "
          type="button"
          variant="primary"
          onClick={handleShowForm}
        >
          Add Project
        </Button>
      </section>
      <hr className="horiz" />
      <Modal show={showFrom} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Project Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Projectform state={state} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Projects;
