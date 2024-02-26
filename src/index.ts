import { ethers, ZeroAddress } from "ethers";
import {
  getResolver,
  supportsInterface,
  onChainReverse,
  offChainReverse,
} from "./functions";

const reverseResolution = async (
  address: string,
  providerUrl: string
): Promise<string | null> => {
  const provider = new ethers.JsonRpcProvider(providerUrl);

  const checksumAddress = ethers.getAddress(address);

  const nameHash = ethers.namehash(
    checksumAddress.substring(2) + ".addr.reverse"
  );

  const resolverAddress = await getResolver(nameHash, provider);

  if (resolverAddress === ZeroAddress) {
    return null;
  }

  const interfaceSupported = await supportsInterface(resolverAddress, provider);

  if (!interfaceSupported) {
    return onChainReverse(nameHash, resolverAddress, provider);
  } else {
    return offChainReverse(nameHash, resolverAddress, provider);
  }
};

export { reverseResolution };
