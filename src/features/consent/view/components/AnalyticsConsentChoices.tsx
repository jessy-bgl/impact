import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SegmentedButtons } from "react-native-paper";

import { UsecasesContext } from "@common/context/UsecasesContext";
import { useAppStore } from "@common/store/useStore";

export const AnalyticsConsentChoices = () => {
  const { t } = useTranslation("menu");

  const consentState = useAppStore((state) => state.analyticsConsent.state);

  const { grantAnalyticsConsent, revokeAnalyticsConsent } =
    useContext(UsecasesContext);

  return (
    <SegmentedButtons
      value={consentState === "granted" ? "granted" : "denied"}
      onValueChange={(value) =>
        value === "granted" ? grantAnalyticsConsent() : revokeAnalyticsConsent()
      }
      buttons={[
        { value: "granted", label: t("consent.enabled"), icon: "check" },
        { value: "denied", label: t("consent.disabled"), icon: "close" },
      ]}
    />
  );
};
