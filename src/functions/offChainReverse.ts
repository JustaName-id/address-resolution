import { ethers } from "ethers";
import { resolverAbi } from "../utils/abis";

const offChainReverse = async (
  name: string,
  node: string,
  resolverAddress: string,
  provider: ethers.Provider
): Promise<string> => {
  const contract = new ethers.Contract(resolverAddress, resolverAbi, provider);

  const abi = new ethers.Interface([
    "function name(bytes32) view returns (string)",
  ]);

  let request = abi.encodeFunctionData("name", [node]);

  let response = await contract.resolve(ethers.dnsEncode(name), request, {
    enableCcipRead: true,
  });

  let [primary] = abi.decodeFunctionResult("name", response);

  return primary;
};

export { offChainReverse };
