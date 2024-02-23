import { ethers } from "ethers";
import { registryAbi } from "../utils/abis";
import { RegistryAddress } from "../utils/constants";
const getResolver = async (
  nameHash: string,
  provider: ethers.Provider
): Promise<string> => {
  const ens = new ethers.Contract(RegistryAddress, registryAbi, provider);

  const resolverAddress = await ens.resolver(nameHash);
  return resolverAddress;
};

export { getResolver };
