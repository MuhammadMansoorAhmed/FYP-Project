import "./App.css";
import Home from "./Home.jsx";
import Charities from "./Charities";
import Login from "./Login";
import Signup from "./Signup";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import auth from "./contracts/Auth.json";
import charity from "./contracts/Charity.json";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App(props) {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    authContract: null,
    charityContract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {

      const authContractAddress = '0xAa712D5d4ABB251cA7D381dBeF28A8B5C320339d';
      const authABI = auth.abi;
      const charityContractAddress = '0x4f0bA37177938aa4e5B81DaBFfB8aCc7bfd7B714';
      const charityABI = charity.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("Accounts: ", account);
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const authContract = new ethers.Contract(
          authContractAddress,
          authABI,
          signer
        );
        const charityContract = new ethers.Contract(
          charityContractAddress,
          charityABI,
          signer
        );
        setState({ provider, signer, authContract, charityContract });
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root state={state} />}>
        <Route index element={<Home />} />
        <Route path="/Charities" element={<Charities state = {state}/>} />
        <Route path="/Login" element={<Login state = {state}/>} />
        <Route path="/Signup" element={<Signup state = {state}/>} />
      </Route>
    )
  );

  
  return (
    <div>
      <RouterProvider router={router} state={state} />
    </div>
  );
}

const Root = ({state}) => {
  return (
    <>
      <div>
        <NavBar state={state} />
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
