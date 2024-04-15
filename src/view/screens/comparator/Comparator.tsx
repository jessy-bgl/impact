import { Platform } from "react-native";

import { useRoute } from "@react-navigation/native";
import { ComparatorForMobile } from "@view/screens/comparator/ComparatorMobile";
import { ComparatorForWeb } from "@view/screens/comparator/ComparatorWeb";

export type AdemeComparatorType =
  | "convertisseur"
  | "numerique"
  | "usagenumerique"
  | "livraison"
  | "chauffage"
  | "transport"
  | "fruitsetlegumes"
  | "repas"
  | "habillement"
  | "mobilier"
  | "electromenager"
  | "boisson";

export const Comparator = () => {
  const { params } = useRoute();

  if (!params || !(params as any).type) return <></>;

  const type: AdemeComparatorType = (params as any).type;

  return Platform.OS === "web" ? (
    <ComparatorForWeb type={type} />
  ) : (
    <ComparatorForMobile type={type} />
  );
};
