import { HeatingEnergies } from "@domain/models/housing/energy/types";

export const defaultHeatingEnergies: HeatingEnergies = {
  electricity: true,
  heatPump: false,
  gas: false,
  gasCylinder: false,
  propane: false,
  fuel: false,
  wood: false,
  heatNetwork: false,
};

//
// https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel
//
export const gasSurface = 1068962604; // m2
export const fuelSurface = 364967468; // m2
export const woodSurface = 146747327; // m2
export const heatNetworkSurface = 82129765; // m2
export const bioGasSurface = 45230016; // m2
// https://selectra.info/energie/guides/conso/consommation-moyenne-gaz/tout-au-gaz
export const gasConsumptionPerSquareMeter = 100; // kWh/m2
export const carbonBasedGasEmissionFactor = 0.221; // kgCO2e/kWh

export const heatingFuelConsumption = 33502306219; // kWh
export const hotWaterFuelConsumption = 5490322725; // kWh
export const fuelCarbonEmissionFactor = 0.324; // kgCO2e/kWh

export const heatingWoodConsumption = 66554452159; // kWh
export const hotWaterWoodConsumption = 355124805; // kWh
export const carbonBasedWoodLogsEmissionFactor = 0.046; // kgCO2e/kWh
export const carbonBasedWoodPelletsEmissionFactor = 0.0113; // kgCO2e/kWh

export const heatingHeatNetworkConsumption = 10406115235; // kWh
export const hotWaterHeatNetworkConsumption = 3385797065; // kWh
export const carbonBasedHeatNetworkEmissionFactor = 0.125; // kgCO2e/kWh

export const heatingBioGasConsumption = 2665257467; // kWh
export const hotWaterBioGasConsumption = 750729503; // kWh
export const carbonBasedBioGasEmissionFactor = 0.272; // kgCO2e/kWh
