//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;
import "hardhat/console.sol";

contract Charity{

     // Events
    event ProjectRequestCreated(uint requestId);
    event ProjectRequestApproved(uint requestId);
    event ProjectRequestRejected(uint requestId);
    event DonationReceived(uint requestId, address donor, uint amount);
    event ProjectRequestCompleted(uint requestId);


    enum ProjectStatus { Created, Approved, Rejected, Completed }

    struct projectInfo{
        uint id;
        address userType;
        string name;
        string description;
        uint totalAmount;
        uint donatedAmount;
        ProjectStatus status;
    }

    //state variable for project info
    projectInfo[] public project;

    address public Admin;

    constructor(){
        Admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender==Admin, "Only admins can call this function.");
        _;
    }
    //project creation function
    function createProject(string memory _name , string memory _description , uint _amount )  public {
        require(msg.sender != Admin,"Only beneficiary and organization can call this functions");
        require(msg.sender != Admin && msg.sender != address(0), "Only beneficiaries and organizations can call this function.");
        projectInfo memory newProjectInfo = projectInfo({
            id: project.length,
            userType: msg.sender,
            name: _name,
            description: _description,
            totalAmount: _amount * 1 ether,
            status: ProjectStatus.Created,
            donatedAmount: 0
        });
        //push data to project info state variable
        project.push(newProjectInfo);

        // write data on blockchain
        emit ProjectRequestCreated(project.length -1);
    }

    //Approve Project functions
    function approveProject(uint _projectId) public onlyAdmin{
        console.log(project.length);
        require(_projectId < project.length,"Invalid Project ID");

        project[_projectId].status = ProjectStatus.Approved;

        console.log("Peoject with ID:",_projectId,"has been Approved"); 

        emit ProjectRequestApproved(_projectId);
    }

    //Reject project Function
    function rejectProject(uint _projectId) public onlyAdmin{
        require(_projectId < project.length, "Invalid project ID");

        project[_projectId].status  = ProjectStatus.Rejected;
        console.log("Peoject with ID:",_projectId,"has been Rejected"); 
        emit ProjectRequestRejected(_projectId);
    }

    //Complete Project status function
    function completeProject(uint _projectId) public {
        require(project[_projectId].totalAmount == project[_projectId].donatedAmount,"Project donations are pending or incomplete");
        project[_projectId].status = ProjectStatus.Completed;
        console.log("Peoject with ID:",_projectId,"has been Completed"); 
        emit ProjectRequestCompleted(_projectId);
    }


    //Donate function
    function donate(uint _projectId) public payable {
        //checking if project exists
        require(_projectId < project.length,"Invalid Project ID");
        //getting project from projects
        projectInfo storage getProject = project[_projectId];
        //CHECKING if project is approved
        require(getProject.status==ProjectStatus.Approved,"Project is not approved yet");
        //checking donation limit
        require(getProject.donatedAmount + msg.value <= getProject.totalAmount ,"Can't accept more than required donation");
        
        require(msg.value > 0, "donate greater than 0");
        //adding donations to the project
        getProject.donatedAmount += msg.value;
        //setting status to Complete if Donation have been completed
        if(getProject.donatedAmount == getProject.totalAmount){
            completeProject(_projectId);
        }
        //emitting event to the blockchain
        emit DonationReceived(_projectId,msg.sender,msg.value);

    }

    // //get Project informations
    // function getProjectDetails(uint _id) public view returns(uint , address , string memory , string memory , uint , uint , ProjectStatus) {
    //     require(_id < project.length,"Invalid Project ID");

    //     return(
    //         project[_id].id,
    //         project[_id].userType,
    //         project[_id].name,
    //         project[_id].description,
    //         project[_id].totalAmount,
    //         project[_id].donatedAmount,
    //         project[_id].status
    //     );
    // }

    //get all projects
    function getprojects() public view returns(projectInfo[] memory ){
        return project;
    }

    //Get Project Related to some Address
    function getProjectsByAddress(address _user) public view returns(projectInfo[] memory) {
    uint count = 0;
    for (uint i = 0; i < project.length; i++) {
        if (project[i].userType == _user) {
            count++;
        }
    }

    projectInfo[] memory userProjects = new projectInfo[](count);

    uint index = 0;
    for (uint i = 0; i < project.length; i++) {
        if (project[i].userType == _user) {
            userProjects[index] = project[i];
            index++;
        }
    }

    return userProjects;
}


}
