import { useState } from "react";
import { ButtonProps, IconButton, useTheme } from "react-native-paper";

import { InfoModal } from "@view/components/modals/InfoModal";

type Props = {
  modalContent: JSX.Element;
  style?: ButtonProps["style"];
};

export const ModalInfoButton = ({ modalContent, style }: Props) => {
  const [visible, setVisible] = useState(false);
  const { colors, fonts } = useTheme();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const buttonStyle: ButtonProps["style"] = {
    margin: 0,
    height: fonts.bodyMedium.lineHeight,
    top: 1.4,
    ...(style ?? ({} as object)),
  };

  return (
    <>
      <IconButton
        icon="information-outline"
        onPress={showModal}
        size={fonts.bodyLarge.fontSize}
        iconColor={colors.primary}
        style={buttonStyle}
      />
      {visible && <InfoModal content={modalContent} hide={hideModal} />}
    </>
  );
};
