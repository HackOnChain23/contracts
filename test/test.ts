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
    const rwdInstance = await RWDToken.deploy(instance.address);
    await rwdInstance.deployed();

    await instance.initRewardContract(rwdInstance.address)

    const tokenURL = "https://bafkreifwoe3imwhatylsy4cnthbofqvgwnf6pgzdqrbnoarjinjzqsi6l4.ipfs.nftstorage.link/";
    await instance.safeMint(addr1.address, "image", tokenURL, 6, 1)

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
    const {instance, owner, addr1, addr2, tokenURL,rwdInstance} = await loadFixture(deployTokenFixture);
    const partNumber = 3;
    await instance.addPart(owner.address, tokenURL, partNumber, 0);
    expect((await instance.getTokenDetails(0)).uriParts[partNumber - 1]).to.be.equal(tokenURL)
  })

  it("Get Reward test", async function () {
    const {instance, owner, addr1, addr2, tokenURL, rwdInstance} = await loadFixture(deployTokenFixture);
    expect((await rwdInstance.ownerOf(1))).to.be.equal(addr1.address)
  })

  it("Get Enumerable", async function () {
    const {instance, owner, addr1, addr2, tokenURL, rwdInstance} = await loadFixture(deployTokenFixture);
    await instance.safeMint(addr1.address, "image", tokenURL, 6, 2)
    console.log(await instance.)
    console.log(await instance.tokenOfOwnerByIndex(addr1.address, 0));
    console.log(await instance.tokenOfOwnerByIndex(addr1.address, 1));
  })
});