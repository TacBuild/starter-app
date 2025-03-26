import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CROSS_CHAIN_LAYER_ADDRESSES = {
  tacTestnet: "0xAd2fBeB7CE5f6e4F9C21090C7e4018081f4b323d"
};

export default buildModule("CrossChainMessaging", (m) => {
  // 1. Deploy SimpleMessage contract
  const simpleMessage = m.contract("SimpleMessage");

  // 2. Get CrossChainLayer address for the network
  const network = process.env.HARDHAT_NETWORK || "tacTestnet";
  const crossChainLayerAddress = CROSS_CHAIN_LAYER_ADDRESSES[network] || CROSS_CHAIN_LAYER_ADDRESSES.tacTestnet;

  // 3. Deploy MessageProxy contract
  const messageProxy = m.contract("MessageProxy", [
    m.getAddress(simpleMessage),
    crossChainLayerAddress
  ]);

  return {
    simpleMessage,
    messageProxy
  };
}); 