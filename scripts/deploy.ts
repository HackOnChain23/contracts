import { ethers } from "hardhat";
const fs = require("fs")
const path = require("path")


async function main() {
  const ContractFactoryBA = await ethers.getContractFactory("BlockArtistry");
  const instanceBA = await ContractFactoryBA.deploy();
  await instanceBA.deployed();

  const ContractFactoryRW = await ethers.getContractFactory("RewardToken");
  const instanceRW = await ContractFactoryRW.deploy(instanceBA.address);
  await instanceRW.deployed();

  instanceBA.initRewardContract(instanceRW.address)

  const getTheAbi = () => {
    try {
      const dir = path.resolve(
        __dirname,
        ".././artifacts/contracts/BlockArtistry.sol/BlockArtistry.json"
      )
      const file = fs.readFileSync(dir, "utf8")
      const json = JSON.parse(file)
      const abi = json.abi
      console.log(`abi`, abi)
  
      return abi
    } catch (e) {
      console.log(`e`, e)
    }
  }
  // getTheAbi()

  // console.log(`ContractBA deployed to ${instanceBA.address}`);
  // console.log(`ContractRW deployed to ${instanceRW.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
