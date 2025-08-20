import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Icon, List, useTheme } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { ListTitle } from "@view/screens/profile/components/lists/ListTitle";
import { useScrollProfileSection } from "@view/screens/profile/utils/ScrollProfileSectionContext";

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
  const { sectionRefs } = useScrollProfileSection();

  const { colors } = useTheme();

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
    <View
      ref={(ref) => {
        if (ref) sectionRefs.current![title] = ref;
      }}
    >
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
