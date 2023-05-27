// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../interfaces/IRewardToken.sol";
import "hardhat/console.sol";

contract RewardToken is
    EIP712,
    Ownable,
    ERC721URIStorage
{
        using Counters for Counters.Counter;
        Counters.Counter private _tokenIdCounter;

    constructor(address ownerAddress) ERC721("Reward Token", "RWD") EIP712("RewardToken", "1"){
        transferOwnership(ownerAddress);
        _tokenIdCounter.increment();
    }

    function safeMint(address to, string memory uri) external {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}