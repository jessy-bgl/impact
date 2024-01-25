import { useTranslation } from "react-i18next";
import { View, ViewStyle } from "react-native";
import { Button, Modal, Portal, useTheme } from "react-native-paper";

type Props = {
  content: JSX.Element;
  hide: () => void;
};

export const InfoModal = ({ content, hide }: Props) => {
  const { t } = useTranslation("common");
  const appTheme = useTheme();

  const modalStyle: ViewStyle = {
    margin: 20,
  };

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
        style={modalStyle}
      >
        <View style={{ padding: 10 }}>{content}</View>
        <View style={{ marginTop: 10 }}>
          <Button compact onPress={hide}>
            {t("ok")}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
