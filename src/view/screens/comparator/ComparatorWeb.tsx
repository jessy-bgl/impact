import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "react-native-paper";

import { AdemeComparatorType } from "@view/screens/comparator/Comparator";

type Props = {
  type: AdemeComparatorType;
};

export const ComparatorForWeb = ({ type }: Props) => {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [showComparator, setShowComparator] = useState(false);

  const ademeComparator = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.getElementById("datagir-impact-co2")?.remove();
    const script = document.createElement("script");
    script.id = "datagir-impact-co2";
    script.src = "https://impactco2.fr/iframe.js";
    script.dataset.type = type;
    script.dataset.search = "?theme=night";
    script.async = true;
    script.onload = () => {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setShowComparator(true);
        }, 500);
      }, 500);
    };
    ademeComparator.current?.appendChild(script);
  }, [type]);

  return (
    <div style={{ paddingInline: 20, overflow: "auto" }}>
      {isLoading && (
        <MotiView
          animate={{ backgroundColor: colors.surface }}
          style={{ paddingVertical: 20 }}
        >
          <Skeleton height={window.innerHeight} width="100%" />
        </MotiView>
      )}

      <div
        ref={ademeComparator}
        style={{
          display: showComparator ? "flex" : "none",
        }}
      />
    </div>
  );
};
