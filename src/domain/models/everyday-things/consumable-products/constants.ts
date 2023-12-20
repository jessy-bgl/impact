const multiPurposeCleanerFootprint = 0.656;

const dishSoapFootprint = 1.48;

const laundryDetergentFootprint = 0.838;

const showerGelFootprint = 1.77;

const shampooFootprint = 0.595;

const cleaningProductsFootprint =
  (multiPurposeCleanerFootprint +
    dishSoapFootprint +
    laundryDetergentFootprint) /
  3;

const hygieneProductsFootprint = (showerGelFootprint + shampooFootprint) / 2;

export const consumableProductsFootprint =
  (cleaningProductsFootprint + hygieneProductsFootprint) / 2;
