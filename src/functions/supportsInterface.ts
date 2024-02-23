import { ethers } from "ethers";
import { resolverAbi } from "../utils/abis";
import { InterfaceId } from "../utils/constants";

const supportsInterface = async (
    resolverAddress: string,
    provider: ethers.Provider
): Promise<boolean> => {
  const resolverContract = new ethers.Contract(
      resolverAddress,
      resolverAbi,
      provider
  );

  const interfaceSupported = await resolverContract.supportsInterface(
      InterfaceId
  );

  return interfaceSupported;
};

export { supportsInterface };