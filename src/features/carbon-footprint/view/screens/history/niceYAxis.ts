/** Step multipliers a reader can count along, per power of ten. */
const roundSteps = [1, 2, 2.5, 5, 10];

/**
 * The y axis of a chart whose highest value is `highest`, split in `sections`
 * equal steps that land on round numbers: 0, 2.5, 5, 7.5, 10 rather than
 * whatever the data's own extremes divide into.
 */
export const niceYAxis = (highest: number, sections: number) => {
  const roughStep = highest / sections;
  if (!(roughStep > 0)) return { maxValue: sections, stepValue: 1 };

  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const stepValue =
    roundSteps
      .map((multiplier) => multiplier * magnitude)
      .find((step) => step >= roughStep) ?? roughStep;

  return { maxValue: stepValue * sections, stepValue };
};
