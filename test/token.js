// https://github.com/rodrigoherrerai/hardhat-tutorial/blob/master/project1/test/token.js
// I updated it for my token with changed namings and solidity version. Logic stays the same.


const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("MyToken.sol", () => {
    let contractFactory;
    let contract;
    let owner;
    let alice;
    let bob;
    let initialSupply;
    let ownerAddress;
    let aliceAddress;
    let bobAddress;

    beforeEach(async () => {
        [owner, alice, bob] = await ethers.getSigners();
        initialSupply = ethers.utils.parseEther("100000");
        contractFactory = await ethers.getContractFactory("MyToken");
        contract = await contractFactory.deploy(initialSupply);
        ownerAddress = await owner.getAddress();
        aliceAddress = await alice.getAddress();
        bobAddress = await bob.getAddress();
    });

    describe("Correct setup", () => {
        it("should be named 'MyToken'", async () => {
            const name = await contract.name();
            expect(name).to.equal("MyToken");
        });
        it("should have correct supply", async () => {
            const supply = await contract.totalSupply();
            expect(supply).to.equal(initialSupply);
        });
        it("owner should have all the supply", async () => {
            const ownerBalance = await contract.balanceOf(ownerAddress);
            expect(ownerBalance).to.equal(initialSupply);
        });
    });

    describe("Core", () => {
        it("owner should transfer to Alice and update balances", async () => {
            const transferAmount = ethers.utils.parseEther("1000");
            console.log(ownerAddress);
            console.log(aliceAddress);
            console.log(bobAddress);
            let aliceBalance = await contract.balanceOf(aliceAddress);
            expect(aliceBalance).to.equal(0);
            await contract.transfer(aliceAddress, transferAmount);
            aliceBalance = await contract.balanceOf(aliceAddress);
            expect(aliceBalance).to.equal(transferAmount);
        });
        it("owner should transfer to Alice and Alice to Bob", async () => {
            const transferAmount = ethers.utils.parseEther("1000");
            await contract.transfer(aliceAddress, transferAmount); // contract is connected to the owner.
            let bobBalance = await contract.balanceOf(bobAddress);
            expect(bobBalance).to.equal(0);
            await contract.connect(alice).transfer(bobAddress, transferAmount);
            bobBalance = await contract.balanceOf(bobAddress);
            expect(bobBalance).to.equal(transferAmount);
        });
        it("should fail by depositing more than current balance", async () => {
            const txFailure = initialSupply + 1;
            await expect(contract.transfer(txFailure, aliceAddress)).to.be.revertedWith("");
        });
        it("create DVD", async () => {
            const id = 1;
            expect(contract.addDVD(ownerAddress, "harry potter", true, id)).to.be.ok;
        });
        it("remove DVD", async () => {
            const id = 1;
            expect(contract.addDVD(ownerAddress, "harry potter", true, id)).to.be.ok;
            expect(contract.removeDVD(id)).to.be.ok;
        });
        it("can't remove DVD if not owner", async () => {
            const id = 1;
            expect(contract.addDVD(ownerAddress, "harry potter", true, id)).to.be.ok;
            await expect(contract.connect(aliceAddress).removeDVD(id)).to.be.revertedWith("");
        });
    });
});