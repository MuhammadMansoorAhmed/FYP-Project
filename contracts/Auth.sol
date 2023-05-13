//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

contract Auth {
    enum UserType { Organization, Beneficiary, Donor, Admin }
    struct UserDetail {
        address addr;
        string name;
        string password;
        UserType userType;
        bool isUserLoggedIn;
    }

    mapping(address => UserDetail) public user;

    // predefined admin user details
    address public owner;
    string public ownerPassword;

    // constructor to initialize admin user
    constructor(string memory _ownerPassword) {
        owner = msg.sender;
        ownerPassword = _ownerPassword;
        register(owner, "Admin", ownerPassword, UserType.Admin);
    }

    // user registration function
    function register(address _address,string memory _name,string memory _password,UserType _userType) public returns (bool) {
        require(user[_address].addr != msg.sender);
        user[_address].addr = _address;
        user[_address].name = _name;
        user[_address].password = _password;
        user[_address].isUserLoggedIn = false;
        user[_address].userType = _userType;
        return true;
    }

    // user login function
    function login(address _address, string memory _password) public returns (bool){
        if (keccak256(abi.encodePacked(user[_address].password)) == keccak256(abi.encodePacked(_password))){
            user[_address].isUserLoggedIn = true;
            return user[_address].isUserLoggedIn;
        } else {
            return false;
        }
    }

    // check the user logged In or not
    function checkIsUserLogged(address _address) public view returns (bool) {
        return (user[_address].isUserLoggedIn);
    }

    // logout the user
    function logout(address _address) public {
        user[_address].isUserLoggedIn = false;
    }
}

