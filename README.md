## Oracles

* Using off-chain data in Smart Contracts
* Trust and decentralization in data sources
* Oracle patterns

### References

<https://fravoll.github.io/solidity-patterns/oracle.html>

<https://ethereum.org/en/developers/docs/oracles/>

## Tellor

* Tellor oracle network
* Getting data
* Data sources
* Query IDs
* Tests

### References

<https://docs.tellor.io/tellor/the-basics/readme>
      
---

## Weekend Project

This is a group activity for at least 3 students:
* Complete the projects together with your group
* Create a voting dApp to cast votes, delegate and query results on chain
* Request voting tokens to be minted using the API
* (bonus) Store a list of recent votes in the backend and display that on frontend
* (bonus) Use an oracle to fetch off-chain data to define the proposals instead of passing them in constructor

### Voting dApp integration guidelines

* Single POST method:
  * Request voting tokens from API
* Use these tokens to interact with the tokenized ballot
* All other interactions must be made directly on-chain

### Steps:

1. Modified the Layouts so that the frontend connects to Sepolia, where we have our contracts deployed.
2. Modified the API so that it connects to the minting tokens and tokenized ballot.
3. After checking that the swagger API works as expected, modified frontend so that it has three buttons:
    a) Mint (request) tokens
    b) Delegates votes
    c) Votes
4. So far, the two first buttons work as expected:
> Tx through the Frontend to Mint which queries the API:  https://sepolia.etherscan.io/tx/0xd3b1ab1890b63fc7a395d3a4268b6e64bc80064cc394f4954bbdde593e618805
> Tx through the Frontend to Self-Delegate which queries the API:
https://sepolia.etherscan.io/tx/0x3b64564e2c0735e7ccbd3f3112cfd376354afa6eab3e2356e199b862ae25a6e5
5. The frontend also queries balance, token and token Balance:
<img width="936" alt="Captura de pantalla 2023-08-21 a las 2 33 33" src="https://github.com/encode-club-solidity-bootcamp-team-3/week-4-weekend-project/assets/34830607/a27bce7b-c058-4367-90a5-24b91caeee1c">

### Explanation

API

- Added selfDelegate DTO for self delegation following a similar structure as for mintTokens DTO.
  
- App Service:

Saved tokenized ballot json file inside assets folder and imported.
Created two contracts const, one for the token and one for tokenized ballot.
Created self delegate and mint functionallity which will be used as post.

- App Controller: 

Imported DTO
Created Mint Token post
Created Self Delegate post
Created Proposals post (although at this moment it is not working as expected).

DAPP

Modified a few things in the css file for the frontend.

Created mintToken button, delegate vote and vote button, calling API.

Changed layout to connect to Sepolis.

They are supposed to return tx hash and, although they do trigger the transaction and it goes through, only for self delegation shows the transaction hash.

--------

# Second page /weekend-project

The goal of this page is to allow multiple users to connect to the dapp and vote using their own wallet.

The token and ballot contracts have been deployed and tokens have been minted, transfered and delegated using scripts.

Started to work on a self delegate feature from the dapp but it is useless because the ballot contract only works if the tokens have been delegated before the ballot contract has been deployed.

![Alt text](image.png)