import { Divider, useTheme } from "react-native-paper";

export const ListItemQuestionDivider = ({ hidden }: { hidden?: boolean }) => {
  const { colors } = useTheme();

  if (hidden) return;

  return (
    <Divider
      style={{
        backgroundColor: colors.surfaceDisabled,
        marginVertical: 10,
      }}
    />
  );
};
