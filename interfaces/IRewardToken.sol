// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IRewardToken {
    function safeMint(address to, string memory uri) external;
}