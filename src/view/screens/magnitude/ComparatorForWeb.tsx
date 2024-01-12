import { useEffect, useRef, RefObject, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const ComparatorForWeb = () => {
  const [isLoading, setIsLoading] = useState(true);

  const ademeComparator: RefObject<HTMLDivElement> | null = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "datagir-impact-co2";
    script.src = "https://impactco2.fr/iframe.js";
    script.dataset.type = "convertisseur";
    script.dataset.search = "?theme=night";
    script.async = true;
    script.onload = () => {
      ademeComparator.current?.querySelector("div")?.remove();
      setTimeout(() => {
        setIsLoading(false);
        ademeComparator.current?.setAttribute("style", "visibility: visible");
      }, 500);
    };
    ademeComparator.current?.appendChild(script);
  }, []);

  return (
    <>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      <div style={{ overflow: "auto" }}>
        <div ref={ademeComparator} style={{ visibility: "hidden" }} />
      </div>
    </>
  );
};
