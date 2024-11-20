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
  const { expandedId, scrollViewRef, sectionRefs } = useScrollProfileSection();

  if (expandedId === title) {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  return (
    <View ref={(ref) => (sectionRefs.current![title] = ref)}>
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
