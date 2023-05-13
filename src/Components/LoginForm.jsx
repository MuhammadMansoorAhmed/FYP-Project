import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ state }) => {
  const { authContract } = state;

  const [address, setAddress] = useState("");
  const [pwd, setPwd] = useState("");

  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [address, pwd]);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
      if (!isValidAddress) {
        setErrMsg("Invalid Ethereum address");
        return;
      }
      const logIn = await authContract.login(address, pwd);
      await logIn.wait();
      // console.log(logIn);

      const userlogin = await authContract.checkIsUserLogged(address);
      // await userlogin.wait();
      console.log(userlogin);
      if (userlogin === true) {
        setAddress("");
        setPwd("");
        navigate("/");
        window.location.reload();
      } else {
        setErrMsg("Invalid Address or Password");
        return;
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrMsg("Failed to Login");
    }
  };

  return (
    <>
      <div className="my-4 d-flex justify-content-center  col-sm-12 h-sm-auto h-50">
        <Card className="m-md-5 p-md-2 w-50 bg-light">
          <Form className="container mt-3" onSubmit={handleLoginSubmit}>
            <p
              ref={errRef}
              className={errMsg ? "errRef" : "offScreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="0x0000000000000000000000000000000000000000"
                autoComplete="off"
                name="Address"
                pattern="^0x[a-fA-F0-9]{40}$"
                value={address}
                ref={userRef}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoComplete="off"
                name="password"
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button className="w-100 mt-2 mb-2" variant="primary" type="submit">
              Log In
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
