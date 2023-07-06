import './Search.css'
import './Form.css'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./Projectform.css";
import { ethers } from "ethers";

const ListProjects = ({ state }) => {
  // let user;
  const { authContract, charityContract } = state;
  const [projects, setProjects] = useState([]);
  const [userType, setUserType] = useState(null);
  const [statusDetails, setStatusDetails] = useState(false);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const isSearchEmpty = searchQuery.trim() === "";


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

  useEffect(() => {
    if (charityContract && (userType === 0 || userType === 1)) {
      loadOrgProjects();
    } else {
      loadProjects();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charityContract, userType]);



  //check User
  const checkUserType = async () => {
    const logUser = await authContract.user(authContract.signer.getAddress());
    const userType = logUser.userType;
    // console.log(logUser.addr, logUser.userType, logUser.isUserLoggedIn);
    return userType;
  };

  const loadOrgProjects = async () => {
    const projectsByAddress = await charityContract.getProjectsByAddress(
      charityContract.signer.getAddress()
    );
    setProjects(projectsByAddress);
  };

  const loadProjects = async () => {
    const projectsByAddress = await charityContract.getprojects();
    setProjects(projectsByAddress);
  };

  //Approaved project
  const ApproveProject = async (idx) => {
    const projectApp = await charityContract.approveProject(
      projects[idx].id.toString()
    );
    await projectApp.wait();
  };
  //Reject Project
  const rejectProject = async (idx) => {
    const projectRej = await charityContract.rejectProject(
      projects[idx].id.toString()
    );
    await projectRej.wait();
  };
  // Transaction Function
  const transferDonation = async (idx, val) => {
    const transactionPermission = projects[idx].status === 1;
    if (!transactionPermission) {
      console.log(transactionPermission);
      setErrMsg("Failed to initiate request for Donation");
      return;
    }
    try {
      const transfer = await charityContract.donate(idx, {
        value: val
      });
      await transfer.wait();
      // console.log("Transaction completed:", receipt.transactionHash);
    } catch (error) {
      if (error.code === "CANCELLED") {
        console.log("Transaction cancelled by user");
      } else {
        console.log("Transaction failed:", error.message);
      }
    }
    window.location.reload();
  };
  //handling Donation
  const handleDonation = async (idx) => {
    const projectID = projects[idx].id;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const address = await signer.getAddress();
    const value = ethers.utils.parseEther("0.00001");

    // Open the Metamask transaction popup
    try {
      const transaction = await signer.sendTransaction({
        to: projects[projectID].userType,
        value: value,
        gasLimit: 200000, // Adjust gas limit as needed
        data: "0x", // Add any additional transaction data if required
      });

      // Wait for user confirmation
      await transaction.wait();

      // Call transferDonation only if the user specified a value
      if (transaction.value.gt(0)) {
        transferDonation(projectID, transaction.value);
      }
    } catch (error) {
      if (error.code === 4001) {
        console.log("Transaction rejected by user");
      } else {
        console.log("Transaction failed:", error.message);
      }
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter projects based on the search query
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query)
    );
    setFilteredProjects(filtered);
  };


  return (
    <div>
      <Row xs={1} md={2} className="g-4 mx-4 bg-light justify-content-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by Name"
          className='SearchBar'
        />

        {isSearchEmpty ? (Array.from({ length: projects.length }).map((_, id) => (
          <Col key={projects[id].id}>
            <Card>
              <Card.Header className="text-center fw-bold">
                {projects[id].name}
              </Card.Header>

              <Card.Body>
                <p
                  ref={errRef}
                  className={errMsg ? "errRef" : "offScreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <Card.Text>
                  <span className="fw-bold"> Project Id: </span>
                  {projects[id].id.toString()}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold"> Donation Address: </span>
                  {projects[id].userType}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold">Desc: </span>
                  {projects[id].description}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold"> Total Amount: </span>
                  {ethers.utils.formatEther(
                    projects[id].totalAmount.toString()
                  )}
                  {" Eth"}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold"> Raised Amount: </span>
                  {ethers.utils.formatEther(
                    projects[id].donatedAmount.toString()
                  )}
                  {" Eth"}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold">Project Status: </span>
                  {projects[id].status}
                  <FontAwesomeIcon
                    className="ms-2"
                    icon={faCircleInfo}
                    aria-describedby="uid"
                    onClick={() => { setStatusDetails(!statusDetails) }}
                  ></FontAwesomeIcon>
                  <span
                    id="uid"
                    className={statusDetails ? "instruction " : "offScreen"}
                  >
                    0:Created 1:Approved 2:Rejected 3:Completed
                  </span>
                </Card.Text>
                {projects[id].status === 0 && userType === 3 ? (
                  <div className="d-flex align-item-center">
                    <Button
                      type="button"
                      className="btn-success  mx-auto"
                      onClick={() => ApproveProject(id)}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button "
                      className="btn-danger mx-auto"
                      onClick={() => rejectProject(id)}
                    >
                      Reject
                    </Button>
                  </div>
                ) : projects[id].status === 1 && userType === 2 ? (

                  <Button
                    onClick={() => handleDonation(id)}
                    type="button"
                    className="d-flex align-item-center text-center"
                  >
                    Donate
                  </Button>
                ) : (<></>)}
              </Card.Body>
            </Card>
          </Col>)
        )) : (Array.from({ length: filteredProjects.length }).map((_, id) => (
          <Col key={filteredProjects[id].id}>
            <Card>
              <Card.Header className="text-center fw-bold">
                {filteredProjects[id].name}
              </Card.Header>

              <Card.Body>
                <p
                  ref={errRef}
                  className={errMsg ? "errRef" : "offScreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <Card.Text>
                  <span className="fw-bold"> Project Id: </span>
                  {filteredProjects[id].id.toString()}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold"> Donation Address: </span>
                  {filteredProjects[id].userType}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold">Desc: </span>
                  {filteredProjects[id].description}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold"> Total Amount: </span>
                  {ethers.utils.formatEther(
                    filteredProjects[id].totalAmount.toString()
                  )}
                  {" Eth"}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold"> Raised Amount: </span>
                  {ethers.utils.formatEther(
                    filteredProjects[id].donatedAmount.toString()
                  )}
                  {" Eth"}
                </Card.Text>
                <Card.Text>
                  <span className="fw-bold">Project Status: </span>
                  {filteredProjects[id].status}
                  <FontAwesomeIcon
                    className="ms-2"
                    icon={faCircleInfo}
                    aria-describedby="uid"
                    onClick={() => { setStatusDetails(!statusDetails) }}
                  ></FontAwesomeIcon>
                  <span
                    id="uid"
                    className={statusDetails ? "instruction " : "offScreen"}
                  >
                    0:Created 1:Approved 2:Rejected 3:Completed
                  </span>
                </Card.Text>
                {filteredProjects[id].status === 0 && userType === 3 ? (
                  <div className="d-flex align-item-center">
                    <Button
                      type="button"
                      className="btn-success  mx-auto"
                      onClick={() => ApproveProject(id)}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button "
                      className="btn-danger mx-auto"
                      onClick={() => rejectProject(id)}
                    >
                      Reject
                    </Button>
                  </div>
                ) : filteredProjects[id].status === 1 && userType === 2 ? (

                  <Button
                    onClick={() => handleDonation(id)}
                    type="button"
                    className="d-flex align-item-center text-center"
                  >
                    Donate
                  </Button>
                ) : (<></>)}
              </Card.Body>
            </Card>
          </Col>)
        ))
        }
      </Row>
    </div>
  );
};

export default ListProjects;
