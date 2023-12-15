export type HeatingEnergies = {
  electricity: boolean;
  heatPump: boolean;
  gas: boolean;
  gasCylinder: boolean;
  propane: boolean;
  bioGas: boolean;
  fuel: boolean;
  wood: boolean;
  heatNetwork: boolean;
};

export type WoodType = "logs" | "pellets";
