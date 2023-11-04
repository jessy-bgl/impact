// (TER + TGV) / 2. Cf Base Carbone 04/04/2022 (SNCF)
export const averageTrainFootprintPerKm = (0.0296 + 0.00236) / 2;

export const defaultHoursPerYearInTrain = 1000;

export const weeksInYear = 52;

// cf Base Carbone 04/04/2022 (SNCF)
const metroFootprintPerKm = 0.00329;

//http://transports.blog.lemonde.fr/2013/03/11/les-petits-secrets-de-la-ratp-reveles-au-public/
const metroAverageSpeed = 25; // km/h

export const averageMetroFootprintPerHour =
  metroFootprintPerKm * metroAverageSpeed;

// cf Base Carbone 04/04/2022 (SNCF)
const busFootprintPerKm = 0.113;

// https://www.lemonde.fr/blog/transports/2013/03/11/les-petits-secrets-de-la-ratp-reveles-au-public/
const busAverageSpeed = 12; // km/h

export const averageBusFootprintPerHour = busFootprintPerKm * busAverageSpeed;
