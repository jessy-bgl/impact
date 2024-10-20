import { useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text } from "react-native-paper";

import { Question } from "@domain/entities/question/Question";
import { InfoModal } from "@view/screens/profile/components/modals/InfoModal";
import { InfoModalState } from "@view/screens/profile/utils/types";

type Props = {
  question: Question;
  style?: StyleProp<TextStyle>;
};

export const TextLabel = ({ question, style }: Props) => {
  const [modal, setModal] = useState<InfoModalState>({ show: false });

  return (
    <>
      {modal.show && (
        <InfoModal
          content={modal.content}
          hide={() => setModal({ show: false })}
        />
      )}
      <Text
        variant="labelLarge"
        style={{ ...(style as TextStyle) }}
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
      </Text>
    </>
  );
};
