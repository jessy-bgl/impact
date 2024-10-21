import { useTranslation } from "react-i18next";
import { ScrollView, View, ViewStyle } from "react-native";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";

type Props = {
  content?: string;
  hide: () => void;
};

export const InfoModal = ({ content, hide }: Props) => {
  const { t } = useTranslation("common");

  const { colors, roundness } = useTheme();

  const containerStyle: ViewStyle = {
    borderRadius: roundness,
    backgroundColor: colors.background,
    padding: 10,
    maxWidth: "90%",
    maxHeight: "80%",
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
        <ScrollView style={{ padding: 10 }}>
          <Text>{content}</Text>
        </ScrollView>
        <View style={{ marginTop: 10 }}>
          <Button compact onPress={hide}>
            {t("ok")}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
