import { PropsWithChildren, useCallback } from "react";
import { View } from "react-native";
import { Icon, List, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { PROFILE_TOUR_TARGETS } from "@carbonFootprint/domain/entities/tour/profileTour";
import { ListTitle } from "@carbonFootprint/view/screens/profile/components/lists/ListTitle";
import { useScrollProfileSection } from "@carbonFootprint/view/screens/profile/ScrollProfileSectionContext";
import { useTourTarget } from "@common/tour/useTourTarget";

type Props = {
  title: string;
  subtitle?: string;
  icon: IconSource;
  completed: boolean;
};

export const ListAccordion = ({
  title,
  subtitle,
  icon,
  completed,
  children,
}: PropsWithChildren<Props>) => {
  const { registerSectionRef } = useScrollProfileSection();

  const { colors } = useTheme();

  // Anchored on the section's own view, not on the accordion title: Paper
  // renders that title inside a <Text>, where a View cannot be measured.
  // The tour collapses every section for this step, so the view is exactly
  // the header row while it is spotlighted.
  const sectionTourRef = useTourTarget(PROFILE_TOUR_TARGETS.sectionHeader, {
    label: title,
  });

  const registerSection = useCallback(
    (ref: View | null) => {
      registerSectionRef(title, ref);
      return sectionTourRef(ref);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, sectionTourRef],
  );

  const renderIcon = (props: any) => (
    <View style={{ position: "relative" }}>
      <List.Icon {...props} icon={icon} />
      {completed && (
        <View
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            backgroundColor: colors.primary,
            borderRadius: 8,
            width: 16,
            height: 16,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.surface,
          }}
        >
          <Icon source="check" size={10} color={colors.surface} />
        </View>
      )}
    </View>
  );

  return (
    <View ref={registerSection} collapsable={false}>
      <List.Accordion
        id={title}
        title={<ListTitle title={title} subtitle={subtitle} />}
        left={renderIcon}
      >
        {children}
      </List.Accordion>
    </View>
  );
};
