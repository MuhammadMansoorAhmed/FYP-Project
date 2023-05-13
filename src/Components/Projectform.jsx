import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Projectform = ({state}) => {
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [totalAmount,setTotalAmount] = useState("")

  const createProject = async (e) =>{
    e.preventDefault();
    try{
    const {charityContract} = state;
    const createProject = await charityContract.createProject(name,desc,totalAmount);
    await createProject.wait()
    window.location.reload();
    }catch(err){
      console.log(err);
    }
  }


  return (
    <Form onSubmit={createProject}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Project Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Project Name" onChange={(e)=> setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDesc">
        <Form.Label>Project Description</Form.Label>
        <Form.Control type="text" placeholder="Add Project Description" onChange={(e)=> setDesc(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAmount">
        <Form.Label>Amount To Be Raised</Form.Label>
        <Form.Control type="number" placeholder="Total Amount" onChange={(e)=> setTotalAmount(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
  );
};

export default Projectform;
