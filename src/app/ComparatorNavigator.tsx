import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

import { Comparator } from "@app/pages/Comparator";

import { AdemeComparatorType } from "@carbonFootprint/domain/entities/comparator/AdemeComparator";

const ComparatorDrawer = createDrawerNavigator();

type ComparatorParams = {
  type: AdemeComparatorType;
};

export const ComparatorNavigator = () => {
  const { t } = useTranslation("pages");

  const { colors } = useTheme();

  return (
    <ComparatorDrawer.Navigator
      initialRouteName="Converter"
      screenOptions={{
        headerTintColor: colors.onBackground,
      }}
    >
      <ComparatorDrawer.Screen
        name="Converter"
        component={Comparator}
        initialParams={{ type: "convertisseur" } as ComparatorParams}
        options={{ title: t("Comparator") }}
      />
      <ComparatorDrawer.Screen
        name="DigitalComparator"
        component={Comparator}
        initialParams={{ type: "numerique" } as ComparatorParams}
        options={{ title: t("DigitalComparator") }}
      />
      <ComparatorDrawer.Screen
        name="DigitalUsageComparator"
        component={Comparator}
        initialParams={{ type: "usagenumerique" } as ComparatorParams}
        options={{ title: t("DigitalUsageComparator") }}
      />
      <ComparatorDrawer.Screen
        name="HeatComparator"
        component={Comparator}
        initialParams={{ type: "chauffage" } as ComparatorParams}
        options={{ title: t("HeatComparator") }}
      />
      <ComparatorDrawer.Screen
        name="HouseholdApplianceComparator"
        component={Comparator}
        initialParams={{ type: "electromenager" } as ComparatorParams}
        options={{ title: t("HouseholdApplianceComparator") }}
      />
      <ComparatorDrawer.Screen
        name="MealComparator"
        component={Comparator}
        initialParams={{ type: "repas" } as ComparatorParams}
        options={{ title: t("MealComparator") }}
      />
      <ComparatorDrawer.Screen
        name="DrinkComparator"
        component={Comparator}
        initialParams={{ type: "boisson" } as ComparatorParams}
        options={{ title: t("DrinkComparator") }}
      />
      <ComparatorDrawer.Screen
        name="FruitsAndVegetablesComparator"
        component={Comparator}
        initialParams={{ type: "fruitsetlegumes" } as ComparatorParams}
        options={{ title: t("FruitsAndVegetablesComparator") }}
      />
      <ComparatorDrawer.Screen
        name="ClothingComparator"
        component={Comparator}
        initialParams={{ type: "habillement" } as ComparatorParams}
        options={{ title: t("ClothingComparator") }}
      />
      <ComparatorDrawer.Screen
        name="ShippingComparator"
        component={Comparator}
        initialParams={{ type: "livraison" } as ComparatorParams}
        options={{ title: t("ShippingComparator") }}
      />
      <ComparatorDrawer.Screen
        name="TransportComparator"
        component={Comparator}
        initialParams={{ type: "transport" } as ComparatorParams}
        options={{ title: t("TransportComparator") }}
      />
    </ComparatorDrawer.Navigator>
  );
};
