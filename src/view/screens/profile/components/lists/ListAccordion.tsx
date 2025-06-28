import { PropsWithChildren } from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { ListTitle } from "@view/screens/profile/components/lists/ListTitle";
import { useScrollProfileSection } from "@view/screens/profile/utils/ScrollProfileSectionContext";

type Props = {
  title: string;
  subtitle?: string;
  icon: IconSource;
};

export const ListAccordion = ({
  title,
  subtitle,
  icon,
  children,
}: PropsWithChildren<Props>) => {
  const { sectionRefs } = useScrollProfileSection();

  return (
    <View
      ref={(ref) => {
        if (ref) sectionRefs.current![title] = ref;
      }}
    >
      <List.Accordion
        id={title}
        title={<ListTitle title={title} subtitle={subtitle} />}
        left={(props) => <List.Icon {...props} icon={icon} />}
      >
        {children}
      </List.Accordion>
    </View>
  );
};
