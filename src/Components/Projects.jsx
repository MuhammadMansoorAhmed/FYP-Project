import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Projectform.css";
import Projectform from "./Projectform";

const Projects = ({ state }) => {
  const { authContract } = state;
  const [showFrom, setShowForm] = useState(false);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const getUserType = async () => {
      if (authContract) {
        const type = await checkUserType();
        setUserType(type);
      }
    };
    getUserType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContract]);

  //check User
  const checkUserType = async () => {
    const logUser = await authContract.user(authContract.signer.getAddress());
    const userType = logUser.userType;
    // console.log(logUser.addr, logUser.userType, logUser.isUserLoggedIn);
    return userType;
  };

  return (
    <>
      {userType === 2?(
        <>
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
        </>):(
      <><section className="text-center mt-3">

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
        </Modal></>)}
      {/* <section className="text-center mt-3">
      
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
      </Modal> */}
    </>
  );
};

export default Projects;
