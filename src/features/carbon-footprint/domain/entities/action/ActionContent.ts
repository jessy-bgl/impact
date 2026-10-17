/** What nosgestesclimat.fr explains about an action, in markdown. */
export type ActionContent = {
  /** "Je comprends l'enjeu" */
  description: string;
  /** "J'agis" */
  tips?: string;
  /** "J'y gagne" */
  benefits?: string;
  detailsUrl: string;
};
