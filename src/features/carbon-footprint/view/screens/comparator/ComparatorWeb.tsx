import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "react-native-paper";

import { AdemeComparatorType } from "@carbonFootprint/domain/entities/comparator/AdemeComparator";

type Props = {
  type: AdemeComparatorType;
};

export const ComparatorForWeb = ({ type }: Props) => {
  const { colors, dark } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [showComparator, setShowComparator] = useState(false);

  const ademeComparator = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.getElementById("datagir-impact-co2")?.remove();
    const script = document.createElement("script");
    script.id = "datagir-impact-co2";
    script.src = "https://impactco2.fr/iframe.js";
    script.dataset.type = type;
    script.dataset.search = `?theme=${dark ? "night" : "default"}`;
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
  }, [dark, type]);

  return (
    <div style={{ paddingInline: 20, overflow: "auto" }}>
      {isLoading && (
        <MotiView
          animate={{ backgroundColor: colors.surface }}
          style={{ paddingVertical: 20 }}
        >
          <Skeleton
            colorMode={dark ? "dark" : "light"}
            height={window.innerHeight}
            width="100%"
          />
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
