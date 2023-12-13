import { HolidayAccomodations } from "@domain/models/housing/leisure/types";

export const defaultHolidayAccomodations: HolidayAccomodations = {
  hotel: false,
  camping: false,
  youthHostel: false,
  rentals: false,
  exchange: false,
};

// https://www.statistiques.developpement-durable.gouv.fr/resultats-detailles-de-lenquete-mobilite-des-personnes-de-2019?rubrique=60&dossier=1345
const averageNightsAwayFromHomePerYear = 26.5;

/*
 * Hotel
 */
// https://librairie.ademe.fr/consommer-autrement/4096-projet-de-pre-deploiement-de-l-affichage-environnemental-des-hotels.html
export const hotelFootprintPerNight = 6.93; // kgCO2e/nuit
const hotelPart = 0.157 + 0.02;
export const averageHotelNightsPerYear =
  averageNightsAwayFromHomePerYear * hotelPart;

/*
 * Camping
 */
export const campingFootprintPerNight = 1.4; // kgCO2e/nuit
const campingPart = 0.066;
export const averageCampingNightsPerYear =
  averageNightsAwayFromHomePerYear * campingPart;

/*
 * Youth hostel
 */
const averagePeoplePerYouthHostelRoom = 6;
export const youthHostelFootprintPerNight =
  campingFootprintPerNight / averagePeoplePerYouthHostelRoom; // kgCO2e/nuit
const youthHostelPart = 0.03;
export const averageYouthHostelNightsPerYear =
  averageNightsAwayFromHomePerYear * youthHostelPart;

/*
 * Rental
 */
// https://librairie.ademe.fr/changement-climatique-et-energie/4688-bilan-des-emissions-de-gaz-a-effet-de-serre-du-secteur-du-tourisme-en-france.html
export const rentalFootprintPerNight = 5.8; // kgCO2e/nuit
const rentalPart = 0.091;
export const averageRentalNightsPerYear =
  averageNightsAwayFromHomePerYear * rentalPart;

/*
 * Exchange
 */
// https://www.homeexchange.fr/p/homeexchange-etude-impact-carbone?ref=homeexchange.fr
export const exchangeFootprintPerNight = 3.52; // kgCO2e/nuit
const exchangePart = 0.008;
export const averageExchangeNightsPerYear =
  averageNightsAwayFromHomePerYear * exchangePart;

/*
 * Pool
 */
// https://futur.eco/documentation/piscine/empreinte-eau-froide
const poolColdWaterFootprint = 18.91;
// https://futur.eco/documentation/piscine/traitement-chimique
const poolChemicalTreatmentFootprint = 24.31;
// https://futur.eco/documentation/piscine/construction
const poolConstructionFootprint = 164.07;
export const poolFootprint =
  poolColdWaterFootprint +
  poolChemicalTreatmentFootprint +
  poolConstructionFootprint;
