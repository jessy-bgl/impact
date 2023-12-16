import { Energy } from "@domain/models/housing/energy/Energy";

const initHeatingEnergiesWithFalsyValues = () => ({
  bioGas: false,
  electricity: false,
  fuel: false,
  gas: false,
  heatNetwork: false,
  propane: false,
  wood: false,
  heatPump: false,
  gasCylinder: false,
});

export const electricityDataset: {
  energy: Energy;
  expectedElectricityAnnualFootprint: number;
}[] = [
  {
    energy: new Energy({ annualElectricityConsumption: 0 }),
    expectedElectricityAnnualFootprint: 0,
  },
  {
    energy: new Energy({ inhabitants: 2, annualElectricityConsumption: 3000 }),
    expectedElectricityAnnualFootprint: 78,
  },
];

export const heatingDataset: {
  energy: Energy;
  expectedHeatingAnnualFootprint: number;
}[] = [
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: initHeatingEnergiesWithFalsyValues(),
    }),
    expectedHeatingAnnualFootprint: 0,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        electricity: true,
        heatPump: true,
      },
    }),
    expectedHeatingAnnualFootprint: 0,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        gas: true,
      },
    }),
    expectedHeatingAnnualFootprint: 1105,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        gas: true,
        bioGas: true,
      },
    }),
    expectedHeatingAnnualFootprint: 924,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        gasCylinder: true,
      },
    }),
    expectedHeatingAnnualFootprint: 107,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        propane: true,
      },
    }),
    expectedHeatingAnnualFootprint: 1222,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        fuel: true,
      },
    }),
    expectedHeatingAnnualFootprint: 1761,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        wood: true,
      },
      woodType: "logs",
    }),
    expectedHeatingAnnualFootprint: 1049,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        wood: true,
      },
      woodType: "pellets",
    }),
    expectedHeatingAnnualFootprint: 258,
  },
  {
    energy: new Energy({
      inhabitants: 2,
      livingSpace: 100,
      heatingEnergies: {
        ...initHeatingEnergiesWithFalsyValues(),
        heatNetwork: true,
      },
    }),
    expectedHeatingAnnualFootprint: 1050,
  },
];
