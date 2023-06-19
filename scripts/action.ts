import { ethers } from "hardhat";

async function main() {
    const url = "https://bafkreifjgvc7kq3jjzxgwrmau37rcyimhrwweffvjdukie7pbosiqujzby.ipfs.nftstorage.link";
    mint(0, url, 6)
    // getBalance("0xD6D610866A888Ce99c0778EE518D7628c1A9a1e4")
    // addPart("0x8caEa39280b90F74BB2251cbD46b85f7A500dd89", "https://bafkreiat43b3xvonhkkto4rcduvnncyzzn2csxklrpjfof7wdk47mjywby.ipfs.nftstorage.link/", 5, 0)
    // getBalance("0x1d81532a666bb93a610d62b62cc264fb9Bc704Ed")
    // console.log(await contract.balanceOf("0x53Cf844a436dFfF4dBD7731584233EE0C8eFc74c"))
}

async function mint(partNumber: number, uri: string, partAmount: number) {
    const BlockArtistry = await ethers.getContractFactory("BlockArtistry");
    const contract = await BlockArtistry.attach(
    "0x7d4c7E53523f73467cA924DE491fb2f766AecF73");
    await contract.safeMint(
            "0x8caEa39280b90F74BB2251cbD46b85f7A500dd89",
            "image",
            uri,
            partAmount,
            partNumber
        ).then(test => console.log(test))
}

async function addPart(address: string, uri: string, tokenPart: number, tokenId: number) {
    const BlockArtistry = await ethers.getContractFactory("BlockArtistry");
    const contract = await BlockArtistry.attach(
    "0x7d4c7E53523f73467cA924DE491fb2f766AecF73");
    // console.log(await contract.addPart(address, uri, tokenPart, tokenId));
    console.log(await contract.tokenURI(tokenId))
}

async function getBalance(address: string) {
    const BlockArtistry = await ethers.getContractFactory("BlockArtistry");
    const contract = await BlockArtistry.attach(
    "0xedED09060d37098e476047634052b6531117bd64");
    console.log("BalanceOf:", await contract.balanceOf(address))
    // console.log(await contract.tokenOfOwnerByIndex(address, 0))
    // console.log(await contract.tokenOfOwnerByIndex(address, 1))
    // console.log(await contract.tokenOfOwnerByIndex(address, 2))
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });