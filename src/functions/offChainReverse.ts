import { ethers } from "ethers";
import { dnsName } from "../utils/dnsName";
import { resolverSelector, nameSelector } from "../utils/abis";
import { arrayify } from "@ethersproject/bytes";

const offChainReverse = async (
    nameHash: string,
    resolverAddress: string,
    provider: ethers.Provider
): Promise<string> => {
  const dnsEncodedName: string = await dnsName(nameHash);

  // Get method selector (first 4 bytes of the Keccak-256 hash of the function signature)
  const resolverFunctionSelector: string = ethers
      .keccak256(ethers.toUtf8Bytes(resolverSelector))
      .slice(0, 10); // Take only first 4 bytes
  const nameFunctionSelector: string = ethers
      .keccak256(ethers.toUtf8Bytes(nameSelector))
      .slice(0, 10); // Take only first 4 bytes

  const abiCoder: ethers.AbiCoder = new ethers.AbiCoder();

  const encodedNameCallData: string = abiCoder.encode(["bytes32"], [nameHash]);

  const nameFunctionData: string = nameFunctionSelector + encodedNameCallData.slice(2);

  const txData: string = abiCoder.encode(
      ["bytes", "bytes"],
      [arrayify(dnsEncodedName), arrayify(nameFunctionData)]
  );

  const finalTxData: string = resolverFunctionSelector + txData.slice(2);

  const tx = {
    to: resolverAddress,
    data: finalTxData,
    enableCcipRead: true,
  };

  const response: string = await provider.call(tx);

  const decodedData = abiCoder.decode(['string'], response);
  const name = decodedData[0];

  return name;
};

export { offChainReverse };