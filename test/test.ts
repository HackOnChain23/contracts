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

    // await instance.initRewardContract(rwdInstance.address)

    const tokenURL = "https://bafkreifwoe3imwhatylsy4cnthbofqvgwnf6pgzdqrbnoarjinjzqsi6l4.ipfs.nftstorage.link/";
    // await instance.safeMint(addr1.address, "image", tokenURL, 6, 1)

    return {Token, instance, owner, addr1, addr2, tokenURL, rwdInstance}
  }

  it("Test contract", async function () {
    const {instance} = await loadFixture(deployTokenFixture);

    expect(await instance.name()).to.equal("Block Artistry");
  });

  // it("Mint test", async function () {
  //   const {instance, addr1} = await loadFixture(deployTokenFixture);
  //   expect((await instance.getTokenDetails(1)).creator).to.be.equal(addr1.address);
  // })

  // it("Add part to NFT", async function () {
  //   const {instance, owner, tokenURL,} = await loadFixture(deployTokenFixture);
  //   const partNumber = 3;
  //   await instance.addPart(owner.address, tokenURL, partNumber, 0);
  //   expect((await instance.getTokenDetails(0)).uriParts[partNumber - 1]).to.be.equal(tokenURL)
  // })

  // it("Get Reward test", async function () {
  //   const {addr1, rwdInstance} = await loadFixture(deployTokenFixture);
  //   expect((await rwdInstance.ownerOf(1))).to.be.equal(addr1.address)
  // })

  // it("Get Enumerable", async function () {
  //   const {instance, addr1, addr2, tokenURL} = await loadFixture(deployTokenFixture);
    // await instance.safeMint(addr1.address, "image", tokenURL, 6, 2)
    // await instance.connect(addr2.address).addPart(addr2.address, "super2", 4, 0)
    // const tokenId1 = await instance.tokenOfOwnerByIndex(addr1.address, 0)
    // const tokenId2 = await instance.tokenOfOwnerByIndex(addr1.address, 1)
    // expect(tokenId2).to.be.not.equal(tokenId1)
  // })

  // it("Check contract init", async function () {
  //   const {instance, addr1, addr2, tokenURL} = await loadFixture(deployTokenFixture);
  //     await instance.safeMint(addr2.address, "image", tokenURL, 6, 3)
  //     const tokenAmount = (await instance.balanceOf(addr2.address))
  //     const tokenId = await instance.tokenOfOwnerByIndex(addr2.address, tokenAmount.sub(1))
  //     await instance.connect(addr2).approve(addr1.address, tokenId)
  //     await instance.connect(addr2).transferFrom(addr2.address, addr1.address, tokenId)
  // })

  it("Reject double contribution", async function () {
    const {instance, addr1, addr2, tokenURL} = await loadFixture(deployTokenFixture);
    await instance.safeMint(addr1.address, "image", tokenURL, 6, 1)
    console.log("token ID", await instance.tokenOfOwnerByIndex(addr1.address, 0))
    // await instance.addPart(addr1.address, tokenURL, 0, 2)
    console.log(await instance.addPart(addr2.address, "test", 3, 0));
    console.log(await instance.tokenURI(0))
    console.log(await instance.ownerOf(0))
  })
});