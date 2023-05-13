import React from "react";
import LoginForm from "./Components/LoginForm";

const Login = ({ state }) => {
  // const { authContract } = state;

  // const userFunction = async () => {
  //   console.log(authContract.signer.getAddress());
  //   const logUser = await authContract.user(authContract.signer.getAddress());

  //   console.log(
  //     logUser.addr,
  //     logUser.name,
  //     logUser.password,
  //     logUser.userType,
  //     logUser.isUserLoggedIn
  //   );
  // };
  // userFunction();
  return (
    <div>
      <LoginForm state={state} />
    </div>
  );
};

export default Login;
