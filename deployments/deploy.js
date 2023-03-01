// https://github.com/rodrigoherrerai/hardhat-tutorial/blob/master/project1/deployments/deployToken.js

const main = async () => {
    const initialSupply = ethers.utils.parseEther("100000");

    const [deployer] = await ethers.getSigners();
    console.log(`Address deploying the contract --> ${deployer.address}`);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const tokenFactory = await ethers.getContractFactory("DVDToken");
    const contract = await tokenFactory.deploy(initialSupply);

    console.log(`Token contract address --> ${contract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });