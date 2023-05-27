import { ethers } from "hardhat";

async function main() {
  const ContractFactoryBA = await ethers.getContractFactory("BlockArtistry");
  const instanceBA = await ContractFactoryBA.deploy();
  await instanceBA.deployed();

  const ContractFactoryRW = await ethers.getContractFactory("RewardToken");
  const instanceRW = await ContractFactoryRW.deploy(instanceBA.address);
  await instanceRW.deployed();

  console.log(`ContractBA deployed to ${instanceBA.address}`);
  console.log(`ContractRW deployed to ${instanceRW.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
