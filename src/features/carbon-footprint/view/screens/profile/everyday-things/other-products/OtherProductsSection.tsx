import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

import { ListTitle } from "@carbonFootprint/view/screens/profile/components/lists/ListTitle";
import { useAppStore } from "@common/store/useStore";

/**
 * Read-only counterpart of the editable sections: it displays the part of the
 * everyday things footprint that no question can change, so that the rows of the
 * screen add up to the category total shown on the profile home.
 */
export const OtherProductsSection = () => {
  const { t } = useTranslation(["everydayThings", "emissions", "common"]);

  const annualFootprint = useAppStore(
    (store) => store.footprints.everydayThings.otherProductsFootprint,
  );

  return (
    <List.Item
      title={
        <ListTitle
          title={t("emissions:everydayThings.other")}
          subtitle={`${annualFootprint} ${t("common:footprintKgPerYear")}`}
        />
      }
      description={t("everydayThings:otherProducts.description")}
      descriptionNumberOfLines={5}
      left={(props) => <List.Icon {...props} icon="dots-horizontal-circle" />}
    />
  );
};
