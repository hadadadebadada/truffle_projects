// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract SimpleStorage {
  uint storedData;
  string data;

  function set(uint x) public {
    storedData = x;
  }

  function setString(string memory y) public{
    data = y;
  }

  function doubleInput(uint x, string memory y) public {
        storedData = x;
        data = y;

  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getString() public view returns (string memory){
    return data;
  }

  function doubleOutput() public view returns(uint, string memory){
    return (storedData, data);
  }

}
