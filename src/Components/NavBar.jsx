import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = ({ state }) => {
  const navigate = useNavigate();
  const { authContract } = state;

  const [isUserLogin, setIsUserLogin] = useState(false);
  // console.log("Nav:" , authContract);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await authContract.checkIsUserLogged(
          await authContract.signer.getAddress()
        );
        // console.log("User is", isUserLogin);
        setIsUserLogin(isLoggedIn);
      } catch (err) {
        console.log(err);
      }
    };
    if (authContract) {
      // check if authContract is available
      checkLoginStatus();
    }
  }, [authContract]);

  const logOutCall = async () => {
    const logOut = await authContract.logout(await authContract.signer.getAddress());
    await logOut.wait()
    setIsUserLogin(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Blockchain Based Charity Platform</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="text-white" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="text-white" href="/Charities">
                Charities
              </Nav.Link>
              {isUserLogin ? (
                <Nav.Link className="text-white" href="#" onClick={logOutCall}>
                  Logout
                </Nav.Link>
              ) : (
                <>
                  {!window.location.pathname.includes("/Signup") && (
                    <Nav.Link className="text-white" href="/Signup">
                      Signup
                    </Nav.Link>
                  )}
                  {!window.location.pathname.includes("/Login") && (
                    <Nav.Link className="text-white" href="/Login">
                      Login
                    </Nav.Link>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
