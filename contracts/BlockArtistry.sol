// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlockArtistry is ERC721, ERC721URIStorage, Ownable, EIP712 {
    using Counters for Counters.Counter;

    struct Token {
        address creator;
        string dataTypes;
        address[] contributors;
        string[] uriParts;
        uint16 partsAmount; 
    }

    mapping (uint256 => address) private _idToOwner;
    mapping (uint256 => uint256) private _detailsToTokenId;

    Counters.Counter private _tokenIdCounter;
    Token[] private tokenList;

    constructor() ERC721("Block Artistry", "BART") EIP712("Block Artistry", "1") {}

    function safeMint(address to, string memory dataTypes, string memory partUri, uint16 partsAmount) public onlyOwner {
        require(partsAmount > 0 && partsAmount < 65534, "Parts amount should be in range [1:65534]");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, partUri);
        address[] memory addressList = new address[](partsAmount);
        string[] memory uriParts = new string[](partsAmount);
        tokenList.push(Token(to, dataTypes, addressList, uriParts, partsAmount));
        _detailsToTokenId[tokenList.length - 1] = tokenId;
    }

    function addPart(string memory partUri, uint16 partNumber, uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Token id not exist!");
        partNumber--;
        uint256 _detailsId = _detailsToTokenId[tokenId];
        Token memory tokenDetails = tokenList[_detailsId];
        require(keccak256(abi.encodePacked(tokenDetails.uriParts[partNumber])) == keccak256(abi.encodePacked("")), "Token part already added, select different part.");
        tokenDetails.uriParts[partNumber] = partUri;
        tokenList[_detailsId] = tokenDetails;
        _setTokenURI(tokenId, partUri);
    }

    function getTokenDetails(uint256 tokenId) public view returns (Token memory token) {
        return(tokenList[_detailsToTokenId[tokenId]]);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}