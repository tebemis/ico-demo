pragma solidity ^0.4.13;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract NVCoin is MintableToken {
  string public name = "New Venture Challenge Coin";
  string public symbol = "NVC";
  uint256 public decimals = 18;
}
