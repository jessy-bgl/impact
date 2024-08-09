import { useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text as RNPText } from "react-native-paper";

import { Question } from "@domain/entities/Question";
import { InfoModal } from "@view/components/modals/InfoModal";
import { InfoModalState } from "@view/screens/profile/utils/types";
import { useStyles } from "@view/screens/profile/utils/useStyles";

type Props = {
  question: Question;
  style?: StyleProp<TextStyle>;
};

export const TextLabel = ({ question, style }: Props) => {
  const { infoTextStyle } = useStyles();
  const [modal, setModal] = useState<InfoModalState>({ show: false });

  return (
    <>
      {modal.show && (
        <InfoModal
          content={modal.content}
          hide={() => setModal({ show: false })}
        />
      )}

      <RNPText
        variant="labelLarge"
        style={{
          ...(style as TextStyle),
          ...(question.description ? { ...infoTextStyle } : {}),
        }}
        onPress={
          question.description
            ? () =>
                setModal({
                  show: true,
                  content: question.description,
                })
            : undefined
        }
      >
        {question.title}
      </RNPText>
    </>
  );
};
