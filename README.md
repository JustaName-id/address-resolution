## Reverse Resolution:

```json
const nameHash = ethers.namehash(testAddress.substring(2) + ".addr.reverse");
```

### First Step: Query Registry Contract:

The first step would be to query the registry contract to get the resolver contract’s address associated with a given nameHash. This should return the off-chain provider’s resolver contract address.

### Second Step: Query the Resolver Contract:

#### Supports Interface:

Call the function [”function supportsInterface(bytes4 interfaceID) returns bool”] with interfaceId = “0x9061b923”.

##### False:

In case it returns false, call the function [”function name(bytes32 node) returns (string)”] on the Resolver contract. This should return the associated name.

##### True:

In case it returns true,
call the function [”resolve(bytes name, bytes data) returns (bytes)”] on the Off-chain Resolver Contract.

The param _name_ should be the DNS-encoded nameHash.

The param _data_ should be [”name(bytes32)”]

##### Query the contract:

The rest of the flow would be an extension to CCIP-Read and ENSIP-10
The contract should revert with the same error:

```json
error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData);
```

##### Call the gateway:

Query the gateway on the url returned by the contract in step2, and pass the sender with the calldata. Example:
{url}/resolve/{sender}/{callData}.json

The off-chain gateway handling the request should add its own logic for handling the [”name(bytes32)”] and return the correct data, similar to how it is handling the logic of:

[”addr(bytes32)”,
“addr(bytes32,uint256)”,
“text(bytes32,string)”,
“contenthash(bytes32)”]

##### Callback Function:

Call the callbackFunction of the contract (returned in revert error of step 2), and pass the gateway response of step3, along with the extraData returned in step 2.
The response returned from the contract should be decoded and will return the primary name associated with the nameHash.
