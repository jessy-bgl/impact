import { WasteBonus, WasteQuantity } from "@domain/models/food/waste/Waste";

export const wasteWithoutBonusDataset: {
  quantity: WasteQuantity;
  expectedFootprint: number;
}[] = [
  { quantity: "zero", expectedFootprint: 48 },
  { quantity: "reduction", expectedFootprint: 194 },
  { quantity: "base", expectedFootprint: 194 },
];

export const wasteWithBonusesDataset: {
  quantity: WasteQuantity;
  expectedFootprint: number;
  bonuses: Record<WasteBonus, boolean>;
}[] = [
  {
    quantity: "zero",
    bonuses: {
      noFoodWaste: true,
      stopAdvertisingSticker: true,
      wasteComposting: true,
    },
    expectedFootprint: 48,
  },
  {
    quantity: "base",
    bonuses: {
      noFoodWaste: true,
      stopAdvertisingSticker: true,
      wasteComposting: true,
    },
    expectedFootprint: 194,
  },
  {
    quantity: "reduction",
    bonuses: {
      noFoodWaste: false,
      stopAdvertisingSticker: false,
      wasteComposting: true,
    },
    expectedFootprint: 183,
  },
  {
    quantity: "reduction",
    bonuses: {
      noFoodWaste: false,
      stopAdvertisingSticker: true,
      wasteComposting: false,
    },
    expectedFootprint: 182,
  },
  {
    quantity: "reduction",
    bonuses: {
      noFoodWaste: true,
      stopAdvertisingSticker: false,
      wasteComposting: false,
    },
    expectedFootprint: 164,
  },
  {
    quantity: "reduction",
    bonuses: {
      noFoodWaste: true,
      stopAdvertisingSticker: true,
      wasteComposting: true,
    },
    expectedFootprint: 141,
  },
];
