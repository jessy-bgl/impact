import { ReactNode } from "react";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { isDemoMode } from "@common/constants";

type Props = {
  children: ReactNode;
};

// The camera cutout keeps a top inset even once the status bar is hidden.
export const DemoSafeArea = ({ children }: Props) => {
  const insets = useSafeAreaInsets();

  if (!isDemoMode) return children;

  return (
    <SafeAreaInsetsContext.Provider value={{ ...insets, top: 0 }}>
      {children}
    </SafeAreaInsetsContext.Provider>
  );
};
