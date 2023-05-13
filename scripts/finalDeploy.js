const hre = require("hardhat");


async function main() {
    const Auth  = await hre.ethers.getContractFactory('Auth');
    const Charity = await hre.ethers.getContractFactory('Charity');

    const authContract = await Auth.deploy('AdminPassword');
    const charityContract = await Charity.deploy();
  
    await authContract.deployed();
    await charityContract.deployed();

    console.log("Auth Contract Address: " ,authContract.address);
    console.log("Charity Contract Address: " ,charityContract.address);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  