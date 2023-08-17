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