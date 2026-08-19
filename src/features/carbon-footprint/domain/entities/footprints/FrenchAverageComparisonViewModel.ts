export type FrenchAverageComparison = "above" | "below" | "equal";

export class FrenchAverageComparisonViewModel {
  readonly isComparable: boolean;
  readonly myBarPart: number;
  readonly averageBarPart: number;
  readonly deltaPercentage: number;
  readonly comparison: FrenchAverageComparison;

  private constructor(
    readonly myFootprint: number,
    readonly averageFootprint: number,
  ) {
    this.isComparable =
      Number.isFinite(myFootprint) &&
      Number.isFinite(averageFootprint) &&
      averageFootprint > 0;

    // Both bars are scaled to the largest of the two: a footprint far above the
    // average fills the track instead of overflowing it.
    const scale = Math.max(myFootprint, averageFootprint);
    this.myBarPart = this.isComparable ? (myFootprint / scale) * 100 : 0;
    this.averageBarPart = this.isComparable
      ? (averageFootprint / scale) * 100
      : 0;

    this.deltaPercentage = this.isComparable
      ? Math.round(
          (Math.abs(myFootprint - averageFootprint) / averageFootprint) * 100,
        )
      : 0;

    this.comparison =
      this.deltaPercentage === 0
        ? "equal"
        : myFootprint > averageFootprint
          ? "above"
          : "below";
  }

  static from = (myFootprint: number, averageFootprint: number) =>
    new FrenchAverageComparisonViewModel(myFootprint, averageFootprint);
}
