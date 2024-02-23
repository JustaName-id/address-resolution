export const registryAbi = ["function resolver(bytes32 node) view returns (address)"];
export const resolverAbi = [
  "function supportsInterface(bytes4 interfaceID) view returns (bool)",
  "function name(bytes32 node) view returns (string)"
];
export const resolverSelector = "resolve(bytes,bytes)";
export const nameSelector = "name(bytes32)";