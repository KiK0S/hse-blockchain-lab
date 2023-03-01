// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


// basically openzeppelin 4.0 erc + mint + burn

struct DVD {
    string name;
    uint256 id;
    bool HD;
    address owner;
}

contract DVDToken is ERC20, Ownable {
    mapping (uint256 => DVD) public DVDs;
    
    constructor(uint256 initialSupply) ERC20("DVDToken", "DVD") {
        _mint(msg.sender, initialSupply);
    }

    event DVDCreated(uint256 id);
    event DVDRemoved(uint256 id);


    function addDVD(address owner, string memory name, bool HD, uint256 id) public {
        DVDs[id] = DVD(name, id, HD, owner);
        emit DVDCreated(id);
    }
    
    function removeDVD(uint256 id) public {
        require(msg.sender == DVDs[id].owner, "Non-owner can't remove DVD");
        delete DVDs[id];
        emit DVDRemoved(id);
    }

    function getDVD(uint256 id) public view returns (DVD memory) {
        return DVDs[id];
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}