// value for 3 concerts or shows per year
export const concertsAndShowsAnnualFootprint = 26.5;

// value for one or two visits per year
export const museumsAndMonumentsAnnualFootprint = 1.3;

// value for 5-15€ spent per month
export const editionsAnnualFootprint = 47.9;

export const musicAnnualFootprint = 3.7;

// https://nosgestesclimat.fr/documentation/empreinte-branche/R93-par-hab
const sdesSportFootprint = 68.05 * 0.63;

// https://www.calameo.com/books/0047558805b1d72793ccf?language=fr&page=1
const proportionOfPractitioners = 0.75;

// https://www.calameo.com/books/0047558805b1d72793ccf?language=fr&page=1
const proportionOfPracticingMembers = 1 / 3;

// https://www2.deloitte.com/fr/fr/pages/presse/2019/le-fitness-en-france-edition-2019.html
const proportionOfFitnessSubscribers = 5960000 / 67750000;

export const sportClubAnnualFootprint =
  (sdesSportFootprint /
    proportionOfPractitioners /
    proportionOfPracticingMembers) *
  0.41;

export const fitnessAnnualFootprint =
  (sdesSportFootprint / proportionOfFitnessSubscribers) * 0.11;

export const distributedSportAnnualFootprint =
  (sdesSportFootprint / proportionOfPractitioners) * (0.27 + 0.21);

export const mountainAnnualFootprint = 9.3 * 5.38;
