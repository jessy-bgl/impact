import {
  FootprintCategory,
  FootprintSubCategory,
} from "@carbonFootprint/domain/entities/footprints/Footprints";
import { Profile } from "@carbonFootprint/domain/entities/profile/Profile";

export const computeProfileSectionVersion = (
  questionKeys: Record<string, keyof Profile>,
): string => (Object.values(questionKeys) as string[]).sort().join("|");

const defineSection = <
  Cat extends FootprintCategory,
  Sub extends FootprintSubCategory,
  T extends Record<string, keyof Profile>,
>(
  category: Cat,
  subCategory: Sub,
  questionKeys: T,
) => ({ category, subCategory, questionKeys });

export const profileSections = {
  // Transport
  plane: defineSection("transport", "plane", {
    planeUsage: "transport . avion . usager",
    annualFlights: "transport . avion . vols annuels",
    amortizedFlights: "transport . avion . vols amortis",
  }),
  car: defineSection("transport", "car", {
    kmPerYear: "transport . voiture . km",
    averagePassengers: "transport . voiture . voyageurs",
    regularUsageOfSameCar: "transport . voiture . utilisateur",
    carSize: "transport . voiture . gabarit",
    carEngine: "transport . voiture . motorisation",
    carFuelType: "transport . voiture . thermique . carburant",
    carFuelConsumption:
      "transport . voiture . thermique . consommation aux 100",
    carElectricityConsumption:
      "transport . voiture . électrique . consommation aux 100",
    carBatteryCapacity:
      "transport . voiture . barème construction . barème électrique . batterie . capacité",
    carHomeCharging: "transport . voiture . électrique . recharge à domicile",
  }),
  twoWheeler: defineSection("transport", "twoWheeler", {
    kmPerYear: "transport . deux roues . km",
    twoWheelerEngine: "transport . deux roues . type",
    twoWheelerUsage: "transport . deux roues . usager",
  }),
  publicTransport: defineSection("transport", "publicTransport", {
    publicTransportUsage: "transport . transports commun",
    trainKmPerYear: "transport . train . km",
    busHoursPerWeek: "transport . transports commun . bus . heures par semaine",
    coachKmPerWeek: "transport . transports commun . car . km par semaine",
    metroHoursPerWeek:
      "transport . transports commun . métro ou tram . heures par semaine",
    boatHoursPerYear: "transport . ferry . heures",
  }),
  otherTransport: defineSection("transport", "otherTransport", {
    gentleMobility: "transport . mobilité douce",
    gentleMobilitySmallVehicleKmPerYear:
      "transport . mobilité douce . autres véhicules à moteur . km",
    gentleMobilityElectricBikeKmPerYear:
      "transport . mobilité douce . vae . km",
    holidaysTransport: "transport . vacances",
    kmPerYearByCamperVan: "transport . vacances . camping car . km",
    kmPerYearByCaravan: "transport . vacances . caravane . distance",
    kmPerYearByVan: "transport . vacances . van . km",
    camperVanFuelConsumption:
      "transport . vacances . camping car . consommation aux 100",
    vanFuelConsumption: "transport . vacances . van . consommation aux 100",
  }),

  // Housing
  home: defineSection("housing", "home", {
    homeType: "logement . type",
    homeProprietary: "logement . propriétaire",
    numberOfInhabitants: "logement . habitants",
    homeAge: "logement . âge",
    surfaceArea: "logement . surface",
    renovationWork: "logement . construction . travaux de rénovation",
    // some of the following questions are disabled because they are already
    // included in the renovationWork question
    // renovation:
    //   "logement . construction . rénovation . travaux . rénovation . présent",
    // renovationExtension:
    //   "logement . construction . rénovation . travaux . extension . présent",
    renovationExtensionSize:
      "logement . construction . rénovation . travaux . extension . taille",
    // renovationHeating:
    //   "logement . construction . rénovation . travaux . chauffage . présent",
    // renovationIsolation:
    //   "logement . construction . rénovation . travaux . isolation . présent",
    photovoltaicPanel: "logement . électricité . photovoltaique . présent",
  }),
  energy: defineSection("housing", "energy", {
    heatingMode: "logement . chauffage . mode",
    heatingMain: "logement . chauffage . principal",
    preciseConsumptionInput:
      "logement . chauffage . saisie précision consommation",
    consumptionFeeling:
      "logement . chauffage . précision consommation . ressenti",
    dpe: "logement . chauffage . précision consommation . saisie DPE",
    waterHeatingMode: "logement . chauffage . mode . pas de chauffage . ecs",
    waterHeatingMain: "logement . chauffage . principal . ecs",
    collectiveHeating: "logement . chauffage . collectif",
    collectiveHeatingEcs: "logement . chauffage . collectif . ecs",
    heating: "logement . chauffage",
    woodType: "logement . chauffage . bois . système",
    // some of the following questions are disabled because they are already
    // included in the renovationWork question
    // woodLogs:
    //   "logement . chauffage . bois . système . chaudière bûches . présent",
    // woodOpenFire:
    //   "logement . chauffage . bois . système . foyer ouvert . présent",
    // woodStoveLogs:
    //   "logement . chauffage . bois . système . poêle bûches . présent",
    woodLogsConsumption:
      "logement . chauffage . bois . type . bûches . consommation",
    woodLogsPreciseConsumption:
      "logement . chauffage . bois . type . bûches . consommation précise en stère",
    // woodPellets:
    //   "logement . chauffage . bois . système . chaudière granulés . présent",
    // woodStovePellets:
    //   "logement . chauffage . bois . système . poêle granulés . présent",
    woodPelletsConsumption:
      "logement . chauffage . bois . type . granulés . consommation",
    woodPelletsPreciseConsumption:
      "logement . chauffage . bois . type . granulés . consommation précise en kg",
    heatNetworkConsumption:
      "logement . chauffage . réseau de chaleur . consommation",
    heatNetworkPreciseConsumption:
      "logement . chauffage . réseau de chaleur . consommation précise",
    gasConsumption: "logement . chauffage . gaz . consommation",
    gasPreciseConsumption: "logement . chauffage . gaz . consommation précise",
    gasBottleConsumption: "logement . chauffage . bouteille gaz . consommation",
    gasPropaneConsumption:
      "logement . chauffage . citerne propane . consommation",
    gasPropanePreciseConsumption:
      "logement . chauffage . citerne propane . consommation précise",
    bioGasContract: "logement . chauffage . gaz . biogaz",
    bioGasPart: "logement . chauffage . biogaz . part",
    fuelOilConsumption: "logement . chauffage . fioul . consommation",
    fuelOilPreciseConsumption:
      "logement . chauffage . fioul . consommation précise",
    airConditioningUsage: "logement . climatisation . présent",
    airConditioningNumber: "logement . climatisation . nombre",
    photovoltaicProduction:
      "logement . électricité . photovoltaique . production",
    photovoltaicPart:
      "logement . électricité . photovoltaique . part autoconsommation",
    electricityConsumption: "logement . électricité . réseau . consommation",
    electricityPreciseConsumption:
      "logement . électricité . saisie précision consommation",
    electricityNetworkPreciseConsumption:
      "logement . électricité . réseau . consommation précise",
  }),
  leisure: defineSection("housing", "leisure", {
    swimmingPoolType: "logement . piscine . type",
    swimmingPoolSize: "logement . piscine . surface",
    outdoorEquipment: "logement . extérieur",
    holidaysLodging: "logement . vacances",
    secondHomeSeasons: "logement . vacances . résidence secondaire . saison",
    secondHomeLocation:
      "logement . vacances . résidence secondaire . localisation",
    secondHomeSurface: "logement . vacances . résidence secondaire . surface",
    secondHomeTimeSpentPerYear:
      "logement . vacances . résidence secondaire . durée",
    hotelNightsPerYear: "logement . vacances . hotel . nombre de nuitées",
    campingNightPerYear: "logement . vacances . camping . nombre de nuitées",
    youthHostelNightsPerYear:
      "logement . vacances . auberge de jeunesse . nombre de nuitées",
    rentalNightsPerYear: "logement . vacances . locations . nombre de nuitées",
    houseExchangeNightsPerYear:
      "logement . vacances . échange . nombre de nuitées",
    cruseNightsPerYear: "logement . vacances . croisière . nombre de nuitées",
  }),

  // Food
  drinks: defineSection("food", "drinks", {
    hotDrinks: "alimentation . boisson . chaude",
    sodaConsumption: "alimentation . boisson . sucrées . litres",
    alcoholConsumption: "alimentation . boisson . alcool . litres",
    bottleWaterConsumption:
      "alimentation . boisson . eau en bouteille . consommateur",
  }),
  meals: defineSection("food", "meals", {
    meals: "alimentation . plats",
    localProducts: "alimentation . local . consommation",
    breakfastType: "alimentation . petit déjeuner . type",
    milkType: "alimentation . boisson . type de lait",
    seasonalProducts: "alimentation . de saison . consommation",
  }),
  waste: defineSection("food", "waste", {
    wasteQuantity: "alimentation . déchets . quantité jetée",
    wasteInput: "alimentation . déchets . gestes . saisie",
    // the following questions are disabled because this is redundant
    // with the question above which already includes them
    // foodWasteGestures:
    //   "alimentation . déchets . gestes . gaspillage alimentaire . présent",
    // buyInBulk: "alimentation . déchets . gestes . acheter en vrac . présent",
    // composting:
    //   "alimentation . déchets . gestes . compostage biodéchets . présent",
    // stopAdvertising: "alimentation . déchets . gestes . stop pub . présent",
  }),

  // Everyday things
  clothes: defineSection("everydayThings", "clothes", {
    clothes: "divers . textile . choix précis",
    clothesQuantity: "divers . textile . empreinte précise",
    clothesQuality: "divers . textile . qualité",
    clothesResell: "divers . textile . revente",
    clothesRenewReason: "divers . textile . volume",
  }),
  digital: defineSection("everydayThings", "digital", {
    hoursPerDayOnInternet: "divers . numérique . internet . durée journalière",
    digitalDevices: "divers . numérique . appareils",
    renewMobile: "divers . numérique . appareils . renouvellement téléphone",
  }),
  furniture: defineSection("everydayThings", "furniture", {
    furniture: "divers . ameublement . meubles",
    preservation: "divers . ameublement . préservation",
  }),
  hobbies: defineSection("everydayThings", "hobbies", {
    culturalHobbies: "divers . loisirs . culture",
    sportHobbies: "divers . loisirs . sports",
  }),
  householdAppliances: defineSection("everydayThings", "householdAppliances", {
    householdAppliances: "divers . électroménager . appareils",
  }),
  pets: defineSection("everydayThings", "pets", {
    numberOfPets: "divers . animaux domestiques . empreinte",
  }),
  tobacco: defineSection("everydayThings", "tobacco", {
    tobaccoConsumption: "divers . tabac . consommation par semaine",
  }),
};
