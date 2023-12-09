import { HeatingEnergies } from "@domain/models/housing/energy/types";

export const defaultHeatingEnergies: HeatingEnergies = {
  electricity: true,
  heatPump: false,
  gas: false,
  gasCylinder: false,
  propane: false,
  bioGas: false,
  fuel: false,
  wood: false,
  woodType: "logs",
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
export const carbonBasedGasEmissionFactor = 0.221; // kgCO2e/kWh
export const gasCylinderCapacity = 13; // kg
export const gasCylinderEnergyPerBottle = 179; // kWh/bottle
export const propaneEnergyPerKg = 13.88; // kWh/kg
export const cookingGasConsumption = 9087203792; // kWh
export const butaneFootprint = 3.44; // kgCO2e/kg
export const propaneFootprint = 3.47; // kgCO2e/kg

export const heatingFuelConsumption = 33502306219; // kWh
export const hotWaterFuelConsumption = 5490322725; // kWh
export const carbonBasedFuelEmissionFactor = 0.324; // kgCO2e/kWh
export const carbonBasedFuelEmissionFactorPerLiter = 3.25; // kgCO2e/L
// https://bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/New_liquides
export const fuelConsumptionPerLiter = 0.101436943; // l/kWh

export const heatingWoodConsumption = 66554452159; // kWh
export const hotWaterWoodConsumption = 355124805; // kWh
export const carbonBasedWoodLogsEmissionFactor = 0.046; // kgCO2e/kWh
export const carbonBasedWoodPelletsEmissionFactor = 0.0113; // kgCO2e/kWh
// https://librairie.ademe.fr/produire-autrement/872-etude-sur-le-chauffage-domestique-au-bois.html, p.10
export const woodLogEnergyIntensity = 1610; // kWh/stere

export const heatingHeatNetworkConsumption = 10406115235; // kWh
export const hotWaterHeatNetworkConsumption = 3385797065; // kWh
export const carbonBasedHeatNetworkEmissionFactor = 0.125; // kgCO2e/kWh

export const heatingBioGasConsumption = 2665257467; // kWh
export const hotWaterBioGasConsumption = 750729503; // kWh
export const carbonBasedBioGasEmissionFactor = 0.272; // kgCO2e/kWh

export const gasConsumptionPerSquareMeter = 100; // kWh/m2

export const fuelConsumptionPerSquareMeter =
  (heatingFuelConsumption + hotWaterFuelConsumption) / fuelSurface;

export const woodConsumptionPerSquareMeter =
  (heatingWoodConsumption + hotWaterWoodConsumption) / woodSurface;

export const heatNetworkConsumptionPerSquareMeter =
  (heatingHeatNetworkConsumption + hotWaterHeatNetworkConsumption) /
  heatNetworkSurface;

export const bioGasConsumptionPerSquareMeter =
  (heatingBioGasConsumption + hotWaterBioGasConsumption) / bioGasSurface;
