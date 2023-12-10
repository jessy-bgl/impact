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

const housesTotalSurface = 1874000000; // m2
const apartmentsTotalSurface = 817000000; // m2
const livingTotalSurface = housesTotalSurface + apartmentsTotalSurface;

/*
 * Surfaces
 * https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel
 */
const electricitySurface = 962771183; // m2
export const gasSurface = 1068962604; // m2
export const fuelSurface = 364967468; // m2
export const woodSurface = 146747327; // m2
export const heatNetworkSurface = 82129765; // m2
export const bioGasSurface = 45230016; // m2
const totalEnergySurface =
  electricitySurface +
  gasSurface +
  fuelSurface +
  woodSurface +
  heatNetworkSurface +
  bioGasSurface;
export const electricitySurfacePart = electricitySurface / totalEnergySurface;

/*
 * Electricity (without heating)
 */
// https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/
export const electricityCarbonIntensity = 0.052; // kgCO2e/kWh
const electricityConsumptionWithoutHeating = 79384041653; // kWh
export const electricityConsumptionWithoutHeatingPerSquareMeter =
  electricityConsumptionWithoutHeating / livingTotalSurface;

/*
 * Gas
 */
// https://selectra.info/energie/guides/conso/consommation-moyenne-gaz/tout-au-gaz
export const carbonBasedGasEmissionFactor = 0.221; // kgCO2e/kWh
export const gasCylinderCapacity = 13; // kg
export const gasCylinderEnergyPerBottle = 179; // kWh/bottle
export const propaneEnergyPerKg = 13.88; // kWh/kg
export const cookingGasConsumption = 9087203792; // kWh
export const butaneFootprint = 3.44; // kgCO2e/kg
export const propaneFootprint = 3.47; // kgCO2e/kg
export const gasConsumptionPerSquareMeter = 100; // kWh/m2

/*
 * Fuel
 */
const heatingFuelConsumption = 33502306219; // kWh
const hotWaterFuelConsumption = 5490322725; // kWh
export const carbonBasedFuelEmissionFactor = 0.324; // kgCO2e/kWh
export const carbonBasedFuelEmissionFactorPerLiter = 3.25; // kgCO2e/L
// https://bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/New_liquides
export const fuelConsumptionPerLiter = 0.101436943; // l/kWh
export const fuelConsumptionPerSquareMeter =
  (heatingFuelConsumption + hotWaterFuelConsumption) / fuelSurface;

/*
 * Wood
 */
const heatingWoodConsumption = 66554452159; // kWh
const hotWaterWoodConsumption = 355124805; // kWh
export const carbonBasedWoodLogsEmissionFactor = 0.046; // kgCO2e/kWh
export const carbonBasedWoodPelletsEmissionFactor = 0.0113; // kgCO2e/kWh
// https://librairie.ademe.fr/produire-autrement/872-etude-sur-le-chauffage-domestique-au-bois.html, p.10
export const woodLogEnergyIntensity = 1610; // kWh/stere
export const woodConsumptionPerSquareMeter =
  (heatingWoodConsumption + hotWaterWoodConsumption) / woodSurface;

/*
 * Heat network
 */
const heatingHeatNetworkConsumption = 10406115235; // kWh
const hotWaterHeatNetworkConsumption = 3385797065; // kWh
export const carbonBasedHeatNetworkEmissionFactor = 0.125; // kgCO2e/kWh
export const heatNetworkConsumptionPerSquareMeter =
  (heatingHeatNetworkConsumption + hotWaterHeatNetworkConsumption) /
  heatNetworkSurface;

/*
 * Bio gas
 */
const heatingBioGasConsumption = 2665257467; // kWh
const hotWaterBioGasConsumption = 750729503; // kWh
export const carbonBasedBioGasEmissionFactor = 0.272; // kgCO2e/kWh
export const bioGasConsumptionPerSquareMeter =
  (heatingBioGasConsumption + hotWaterBioGasConsumption) / bioGasSurface;

/*
 * Electricity
 */
const heatingElectricityConsumption = 34746847942; // kWh
const hotWaterElectricityConsumption = 25101553844; // kWh
const cookingElectricityConsumption = 12415175837; // kWh
const electricityConsumption =
  heatingElectricityConsumption +
  hotWaterElectricityConsumption +
  cookingElectricityConsumption; // kWh
export const electricityConsumptionPerSquareMeter =
  electricityConsumption / electricitySurface;

/*
 * Air conditioning
 */
export const houseDefaultNumberOfAirConditioners = 0.31;
export const apartmentDefaultNumberOfAirConditioners = 0.2;
const annualAirConditionLeakQuantity = 1.72 * 0.0042;
const refrigeratorFluidFootprint = 1924; // kgCO2e/kg
const annualAirConditionerLeaksFootprint =
  annualAirConditionLeakQuantity * refrigeratorFluidFootprint; // kgCO2e/kg
const airConditionerEndOfLifeLeaksQuantity = 1.72 * 0.664;
const airConditionerEndOfLifeLeaksFootprint =
  airConditionerEndOfLifeLeaksQuantity * refrigeratorFluidFootprint; // kgCO2e/kg
const airConditionerLifetimeInYears = 6;
const airConditionerEndOfLifeLeaksFootprintAmortized =
  airConditionerEndOfLifeLeaksFootprint / airConditionerLifetimeInYears;
const airConditionerConstructionFootprint = 239; // kgCO2e/airConditioner
const airConditionerAmortizedConstructionFootprint =
  airConditionerConstructionFootprint / airConditionerLifetimeInYears; // kgCO2e/kg
export const airConditioningUnitFootprint =
  annualAirConditionerLeaksFootprint +
  airConditionerEndOfLifeLeaksFootprintAmortized +
  airConditionerAmortizedConstructionFootprint;
