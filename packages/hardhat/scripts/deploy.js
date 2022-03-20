const chalk = require("chalk");

const main = async () => {
  console.log("\n 📡 Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const TransferAccount = await ethers.getContractFactory("TransferAccount");
  const transferAccount = await TransferAccount.deploy('0x88757f2f99175387ab4c6a4b3067c77a695b0349');

  console.log("Contract address:", transferAccount.address);

  console.log(
    " 💾  Artifacts (address, abi, and args) saved to: ",
    chalk.blue("packages/hardhat/artifacts/"),
    "\n\n"
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });