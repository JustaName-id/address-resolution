export const registryAbi = [
  "function resolver(bytes32 node) view returns (address)",
];
export const resolverAbi = [
  "function supportsInterface(bytes4 interfaceID) view returns (bool)",
  "function name(bytes32 node) view returns (string)",
  "function resolve(bytes,bytes) view returns (bytes)",
];
