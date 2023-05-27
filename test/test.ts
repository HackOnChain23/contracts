import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("BlockArtistry", function () {

  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("BlockArtistry");
    const instance = await Token.deploy();
    // await instance.deployed();

    const RWDToken = await ethers.getContractFactory("RewardToken");
    console.log(instance.address)
    console.log("Balance: ",await RWDToken.signer.getBalance())
    const rwdInstance = await RWDToken.deploy(instance.address);
    // await rwdInstance.deployed();
    const tokenURL = "https://bafkreifwoe3imwhatylsy4cnthbofqvgwnf6pgzdqrbnoarjinjzqsi6l4.ipfs.nftstorage.link/";
    console.log("Add 0", owner.address)

    console.log("Add 1", addr1.address)

    console.log("Add 2", addr2.address)
    await instance.safeMint(addr1.address, "image", tokenURL, 6)

    return {Token, instance, owner, addr1, addr2, tokenURL, rwdInstance}
  }

  it("Test contract", async function () {
    const {instance} = await loadFixture(deployTokenFixture);

    expect(await instance.name()).to.equal("Block Artistry");
  });

  it("Mint test", async function () {
    const {instance, owner, addr1, tokenURL} = await loadFixture(deployTokenFixture);
    expect((await instance.getTokenDetails(1)).creator).to.be.equal(addr1.address);
  })

  it("Add part to NFT", async function () {
    const {instance, owner, addr1, addr2, tokenURL} = await loadFixture(deployTokenFixture);
    const partNumber = 2;
    await instance.safeMint(addr1.address, "image", tokenURL, 6)
    console.log("Owner",await instance.owner())
    await instance.addPart(owner.address, tokenURL, partNumber, 0);
    console.log("test")
    expect((await instance.getTokenDetails(1)).uriParts[partNumber - 1]).to.be.equal(tokenURL)
  })

  it("Get Reward test", async function () {
    const {instance, owner, addr1, addr2, tokenURL, rwdInstance} = await loadFixture(deployTokenFixture);
  })
});