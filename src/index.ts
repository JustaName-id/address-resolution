import { ethers, ZeroAddress } from "ethers";
import {
  getResolver,
  supportsInterface,
  onChainReverse,
  offChainReverse,
} from "./functions";

const addressResolution = async (
  address: string,
  providerUrl: string
): Promise<string | null> => {
  const provider = new ethers.JsonRpcProvider(providerUrl);

  const checksumAddress = ethers.getAddress(address);

  const name = checksumAddress.substring(2) + ".addr.reverse";

  const node = ethers.namehash(name);

  const resolverAddress = await getResolver(node, provider);

  if (resolverAddress === ZeroAddress) {
    return null;
  }

  let interfaceSupported = false;
  try {
    interfaceSupported = await supportsInterface(resolverAddress, provider);
    console.log({ interfaceSupported });
  } catch (error) {
    console.error(`Error checking interface support: ${error}`);
  }

  if (!interfaceSupported) {
    return onChainReverse(node, resolverAddress, provider);
  } else {
    return offChainReverse(name, node, resolverAddress, provider);
  }
};

export { addressResolution };
