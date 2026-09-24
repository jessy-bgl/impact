import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View } from "react-native";

/**
 * Stands in for `@gorhom/bottom-sheet` under Jest: the real modal relies on
 * Reanimated layout passes that never happen in the test renderer, so its
 * content would never show up. This keeps the only behaviour tests care about —
 * children are mounted between `present()` and `dismiss()`.
 *
 * Install it with:
 * `jest.mock("@gorhom/bottom-sheet", () => require("@common/test/gorhomBottomSheetStub"));`
 */
export const BottomSheetModal = forwardRef<
  { present: () => void; dismiss: () => void },
  PropsWithChildren<{ onChange?: (index: number) => void }>
>(({ children, onChange }, ref) => {
  const [presented, setPresented] = useState(false);

  useImperativeHandle(ref, () => ({
    present: () => setPresented(true),
    dismiss: () => setPresented(false),
  }));

  // Reported from an effect, not from `dismiss()`: consumers close the sheet
  // from their own `onChange` handler, which would otherwise recurse.
  const wasPresented = useRef(presented);
  useEffect(() => {
    if (wasPresented.current && !presented) onChange?.(-1);
    wasPresented.current = presented;
  }, [presented, onChange]);

  return presented ? <View>{children}</View> : null;
});

BottomSheetModal.displayName = "BottomSheetModal";

export const BottomSheetModalProvider = ({ children }: PropsWithChildren) => (
  <>{children}</>
);

export const BottomSheetView = ({ children }: PropsWithChildren) => (
  <View>{children}</View>
);

export const BottomSheetBackdrop = () => null;

export type BottomSheetBackdropProps = { children?: ReactNode };
