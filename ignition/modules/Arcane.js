const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Arcane", (m) => {
  const Arcane = m.contract("arcane");
  return { Arcane };
});
