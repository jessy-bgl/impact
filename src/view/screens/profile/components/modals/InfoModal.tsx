import { useTranslation } from "react-i18next";
import { View, ViewStyle } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";

type Props = {
  content?: string;
  hide: () => void;
};

export const InfoModal = ({ content, hide }: Props) => {
  const { t } = useTranslation("common");

  const appTheme = useTheme();

  const containerStyle: ViewStyle = {
    borderRadius: 5,
    backgroundColor: appTheme.colors.background,
    padding: 10,
    maxWidth: 500,
    alignSelf: "center",
  };

  return (
    <Portal>
      <Modal
        visible
        onDismiss={hide}
        contentContainerStyle={containerStyle}
        style={{ padding: 20 }}
      >
        <View style={{ padding: 10 }}>
          <Text>{content}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button compact onPress={hide}>
            {t("ok")}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
