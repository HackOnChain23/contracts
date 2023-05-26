import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("BlockArtistry", function () {

  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("BlockArtistry");
    const instance = await Token.deploy();
    await instance.deployed();
    const RWDToken = await ethers.getContractFactory("RewardToken");
    const rwdInstance = await RWDToken.deploy();
    await rwdInstance.deployed();
    const tokenURL = "https://bafkreifwoe3imwhatylsy4cnthbofqvgwnf6pgzdqrbnoarjinjzqsi6l4.ipfs.nftstorage.link/";

    return {Token, instance, owner, addr1, addr2, tokenURL, rwdInstance}
  }

  it("Test contract", async function () {
    const {instance} = await loadFixture(deployTokenFixture);

    expect(await instance.name()).to.equal("Block Artistry");
  });

  it("Mint test", async function () {
    const {instance, owner, addr1, tokenURL} = await loadFixture(deployTokenFixture);
    await instance.safeMint(addr1.address, tokenURL, "image", 6)
    expect((await instance.getTokenDetails(1)).creator).to.be.equal(addr1.address);
  })

  it("Add part to NFT", async function () {
    const {instance, owner, addr1, tokenURL} = await loadFixture(deployTokenFixture);
    await instance.safeMint(addr1.address, tokenURL, "image", 6)
    await instance.addPart(tokenURL, 2, 0);
    console.log((await instance.getTokenDetails(1)).uriParts)

  })

  it("Get Reward test", async function () {
    const {instance, owner, addr1, addr2, tokenURL, rwdInstance} = await loadFixture(deployTokenFixture);
  })
});