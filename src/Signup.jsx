import React from "react";
import SignUpForm from "./Components/SignUpForm";


const Signup = ({state}) => {
 
  return (
    <div >
    <SignUpForm state = {state}/>
    </div>
  );
};

export default Signup;
