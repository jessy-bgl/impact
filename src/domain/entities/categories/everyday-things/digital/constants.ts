import { Preservation } from "@domain/entities/categories/everyday-things/types";

export const defaultInternetDailyHours = 2;
export const defaultMobilePhones = 1;
export const defaultLaptops = 1;
export const defaultTelevisions = 1;

// https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix
const internetHourlyConsumption = 0.077; // kWh/h
const electricityIntensity = 0.052; // kgCO2e/h
export const internetHourlyFootprint =
  internetHourlyConsumption * electricityIntensity;

export const mobilePhone = {
  footprint: 57,
  lifetimeInYears: 2.5,
};

export const camera = {
  footprint: 30,
  lifetimeInYears: 5,
};

export const homeCinema = {
  footprint: 133,
  lifetimeInYears: 8,
};

export const laptop = {
  footprint: 156,
  lifetimeInYears: 3,
};

export const desktopComputer = {
  footprint: 296 + 248,
  lifetimeInYears: 6,
};

export const tablet = {
  footprint: 63,
  lifetimeInYears: 3,
};

export const television = {
  footprint: 371,
  lifetimeInYears: 8,
};

export const videoProjector = {
  footprint: 94,
  lifetimeInYears: 5,
};

export const bluetoothSpeaker = {
  footprint: 8.98,
  lifetimeInYears: 5,
};

export const vocalSpeaker = {
  footprint: 30.7,
  lifetimeInYears: 5,
};

export const smartWatch = {
  footprint: 9.72,
  lifetimeInYears: 4,
};

export const gamingConsole = {
  footprint: 73.7,
  lifetimeInYears: 6.5,
};

export const portableConsole = {
  footprint: 30.8,
  lifetimeInYears: 6.5,
};

export const preservationCoefficient = (preservation: Preservation) => {
  switch (preservation) {
    case "none":
      return 1 / 2;
    case "low":
      return 2 / 3;
    case "medium":
      return 1;
    case "high":
      return 4 / 3;
  }
};
