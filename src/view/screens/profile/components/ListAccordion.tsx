import { PropsWithChildren } from "react";
import { List } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { ListTitle } from "@view/screens/profile/components/ListTitle";

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
  return (
    <List.Accordion
      title={<ListTitle title={title} subtitle={subtitle} />}
      left={(props) => <List.Icon {...props} icon={icon} />}
    >
      {children}
    </List.Accordion>
  );
};
