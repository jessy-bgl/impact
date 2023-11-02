import { haulFlight } from "./Plane";

export const defaultAverageSpeed: Record<haulFlight, number> = {
  // we take Paris-Toulouse as a reference flight, in km/h
  short: 600 / 1.3,
  // we take Paris-Alger as a reference flight, in km/h
  medium: 1350 / 2.5,
  // http://www.abm.fr/voyager-en-avion-le-guide-du-passager/en-complement/distances-et-durees-de-vol.html
  long: 5800 / 8.5,
};

export const defaultAverageFootprintPerKm: Record<haulFlight, number> = {
  // cf footprint "Avion passagers - Court courrier, 2018 - AVEC trainées"
  short: 0.258,
  // cf footprint "Avion passagers - Moyen courrier, 2018 - AVEC trainées"
  medium: 0.187,
  // cf footprint "Avion passagers - Long courrier, 2018 - AVEC trainées"
  long: 0.152,
};
