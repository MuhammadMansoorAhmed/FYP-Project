import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Form.css";

const SignUpForm = ({ state }) => {
  const navigate = useNavigate();
  // console.log("SignUp Page:", state);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const AddressRegx = /^0x[a-fA-F0-9]{40}$/;
  const NameRegx = /^[a-zA-Z ]{3,24}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const passwordRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [addressType, setAddressType] = useState("");

  const [address, setAddress] = useState("");
  const [validAddress, setvalidAddress] = useState(false);
  const [AddressFocus, setAddressFocus] = useState(false);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [NameFocus, setNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = AddressRegx.test(address);
    setvalidAddress(result);
  }, [AddressRegx, address]);

  useEffect(() => {
    const result = NameRegx.test(name);
    setValidName(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    const result = passwordRegx.test(pwd);
    setValidPwd(result);
  }, [passwordRegx, pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [address, name, pwd]);

  const { authContract } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const userAddress = ethers.utils.getAddress(authContract.address);
    // console.log("userAddresss", userAddress);

    const addValue = AddressRegx.test(address);
    const nameVal = NameRegx.test(name);
    const passval = passwordRegx.test(pwd);

    if (!addValue || !nameVal || !passval) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
      if (!isValidAddress) {
        setErrMsg("Invalid Ethereum address");
        return;
      }
      const registerUser = await authContract.register(
        address,
        name,
        pwd,
        addressType
      );
      await registerUser.wait();
      console.log("Response",registerUser);
      setSuccess(true);

    } catch (error) {
      console.error(error);
      setErrMsg("Error registering user");
    }
  };

  return (
    <>
      {success ? (
        <section
          className="my-4 d-flex justify-content-center  col-sm-12 h-sm-auto h-50"
          style={{ height: "fitContent", zIndex: "2" }}
        >
          <Card className="m-md-5 p-2 w-50 bg-light">
            <h1>Registration Successful!</h1>
            <br />
            {setTimeout(()=>{
              navigate("/")
            },3000)}
          </Card>
        </section>
      ) : (
        <div
          className="my-4 d-flex justify-content-center  col-sm-12 h-sm-auto h-50"
          style={{ height: "fitContent", zIndex: "2" }}
        >
          <Card className="m-md-5 p-md-2 w-50 bg-light">
            <Form className="container mt-3" onSubmit={handleSubmit}>
              <p
                ref={errRef}
                className={errMsg ? "errRef" : "offScreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              {/* Address */}

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>
                  Address
                  <span className={validAddress ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validAddress || !address ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0x0000000000000000000000000000000000000000"
                  autoComplete="off"
                  ref={userRef}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  required
                  aria-invalid={validAddress ? false : true}
                  aria-describedby="uIdAddress"
                  onFocus={() => setAddressFocus(true)}
                  onBlur={() => setAddressFocus(false)}
                />
                <Form.Text
                  id="uIdAddress"
                  className={
                    AddressFocus && address && !validAddress
                      ? "instruction "
                      : "offScreen"
                  }
                >
                  Enter Your Metamask Address
                </Form.Text>
              </Form.Group>

              {/* Name */}

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>
                  Name
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !name ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Mansoor"
                  autoComplete="off"
                  name="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  aria-invalid={validName ? false : true}
                  aria-describedby="uIdName"
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                />
                <Form.Text
                  id="uIdName"
                  className={
                    NameFocus && name && !validName
                      ? "instruction "
                      : "offScreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mx-1" />
                  3-24 Characters Must begin with the Letter
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>
                  Password
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </Form.Label>
                <Form.Control
                  type="Password"
                  placeholder="Password"
                  name="Password"
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                  required
                  aria-invalid={validPwd ? false : true}
                  aria-describedby="uIdPassword"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <Form.Text
                  id="uIdPassword"
                  className={
                    pwdFocus && !validPwd ? "instruction" : "offScreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="mx-1" />
                  Password must contain Capital-Letter, Number And Special
                  Character
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="addressType">
                <Form.Label>Address Type</Form.Label>
                <Form.Select
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                >
                  <option value="">Select Address Type</option>
                  <option value="0">Organization</option>
                  <option value="1">Beneficiary</option>
                  <option value="2">Donor</option>
                </Form.Select>
              </Form.Group>
              <Button
                className="w-100 mt-4 mb-4"
                variant="primary"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
