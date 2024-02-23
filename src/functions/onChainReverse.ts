import { ethers } from "ethers";
import { resolverAbi } from "../utils/abis";

const onChainReverse = async (
    nameHash: string,
    resolverAddress: string,
    provider: ethers.Provider
): Promise<string> => {
  const resolverContract = new ethers.Contract(
      resolverAddress,
      resolverAbi,
      provider
  );
  const name = await resolverContract.name(nameHash);
  return name;
};

export { onChainReverse };