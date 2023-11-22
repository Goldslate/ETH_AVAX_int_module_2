// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract decenMessage {

    mapping (address => string ) private messages;

    constructor(){

    }

    function sendMessage(address reciever, string memory message)
    public  {

        messages[reciever] = message;

    }

    function getMessage()
    public 
    view 
    returns (string memory){

        if(bytes(messages[msg.sender]).length == 0){
            return "No Messages";

        }
        else{
            return messages[msg.sender];
        }
    }

    function deleteMessage()
    public{
        require(bytes(messages[msg.sender]).length != 0, "You don't have any messages to delete");
        delete messages[msg.sender];
    }
}   