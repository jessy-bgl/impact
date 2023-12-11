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

export const surfaces = {
  houses: 1874000000, //m2
  appartements: 817000000, //m2
  get living() {
    return this.houses + this.appartements;
  },

  /*
   * Surfaces
   * https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel
   */
  electricity: 962771183, //m2
  gas: 1068962604, //m2
  fuel: 364967468, //m2
  wood: 146747327, //m2
  heatNetwork: 82129765, //m2
  bioGas: 45230016, //m2
  get energy() {
    return (
      this.electricity +
      this.gas +
      this.fuel +
      this.wood +
      this.heatNetwork +
      this.bioGas
    );
  },
  get electricityPart() {
    return this.electricity / this.energy;
  },
};

/*
 * Electricity (without heating)
 */
// https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/
export const electricityWithoutHeating = {
  carbonIntensity: 0.052, // kgCO2e/kwh
  consumption: 79384041653, // kWh
  get consuptionPerSquareMeter() {
    return this.consumption / surfaces.living;
  },
};

/*
 * Gas
 */
// https://selectra.info/energie/guides/conso/consommation-moyenne-gaz/tout-au-gaz
const gasCylinderCapacity = 13; // kg

export const gas = {
  consumption: {
    cooking: 9087203792, // kWh
    perSquareMeter: 100, // kWh/m2
  },
  carbonBasedEmissionFactor: 0.221, // kgCO2e/kWh
  footprint: {
    butane: 3.44, // kgCO2e/kg
    propane: 3.47, // kgCO2e/kg
    get cylinder() {
      return ((this.butane + this.propane) / 2) * gasCylinderCapacity;
    },
  },
  energy: {
    cylinderPerBottle: 179, // kWh/bottle
    propanePerKg: 13.88, // kWh/kg
  },
};

/*
 * Fuel
 */
export const fuel = {
  consumption: {
    heating: 33502306219, // kWh
    hotWater: 5490322725, // kWh
    // https://bilans-ges.ademe.fr/fr/accueil/documentation-gene/index/page/New_liquides
    perLiter: 0.101436943, // L/kWh
    get perSquareMeter() {
      return (this.heating + this.hotWater) / surfaces.fuel;
    },
  },
  carbonBasedEmissionFactor: {
    perKiloWattHeure: 0.324, // kgCO2e/kWh
    perLiter: 3.25, // kgCO2e/L
  },
};

/*
 * Wood
 */
export const wood = {
  consumption: {
    heating: 66554452159, // kWh
    hotWater: 355124805, // kWh
    get perSquareMeter() {
      return (this.heating + this.hotWater) / surfaces.wood;
    },
    // https://librairie.ademe.fr/produire-autrement/872-etude-sur-le-chauffage-domestique-au-bois.html, p.10
    perLog: 1610, // kWh/stere
  },
  carbonBasedEmissionFactor: {
    logs: 0.046, // kgCO2e/kWh
    pellets: 0.0113, // kgCO2e/kWh
  },
};

/*
 * Heat network
 */
export const heatNetwork = {
  consumption: {
    heating: 10406115235, // kWh
    hotWater: 3385797065, // kWh
    get perSquareMeter() {
      return (this.heating + this.hotWater) / surfaces.heatNetwork;
    },
  },
  carbonBasedEmissionFactor: 0.125,
};

/*
 * Bio gas
 */
export const bioGas = {
  consumption: {
    heating: 2665257467, // kWh
    hotWater: 750729503, // kWh
    get perSquareMeter() {
      return (this.heating + this.hotWater) / surfaces.heatNetwork;
    },
  },
  carbonBasedEmissionFactor: 0.272, // kgCO2e/kWh
};

/*
 * Electricity
 */
export const electricity = {
  consumption: {
    heating: 34746847942, // kWh
    hotWater: 25101553844, // kWh
    cooking: 12415175837, // kWh
    get all() {
      return this.heating + this.hotWater + this.cooking;
    },
    get perSquareMeter() {
      return this.all / surfaces.electricity;
    },
  },
};

/*
 * Air conditioning
 */
const airConditioninglifetimeInYear = 6;
const refrigeratorFluid = 1924; // kgCO2e/kg

export const airConditioner = {
  defaultNumber: {
    house: 0.31,
    apartment: 0.2,
  },
  footprint: {
    get annualLeak() {
      return 1.72 * 0.0042 * refrigeratorFluid;
    },
    get endOfLifeLeak() {
      return 1.72 * 0.664 * refrigeratorFluid;
    },
    get endOfLifeLeakAmortized() {
      return this.endOfLifeLeak / airConditioninglifetimeInYear;
    },
    construction: 239, // kgCO2e/airConditioner
    get constructionAmortized() {
      return this.construction / airConditioninglifetimeInYear;
    },
    get all() {
      return (
        this.annualLeak +
        this.endOfLifeLeakAmortized +
        this.constructionAmortized
      );
    },
  },
};
