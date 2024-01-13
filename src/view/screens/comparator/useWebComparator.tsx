import { useEffect, useRef, RefObject, useState } from "react";

import { AdemeComparatorType } from "@view/screens/comparator/Comparator";

export const useWebComparator = (type: AdemeComparatorType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showComparator, setShowComparator] = useState(false);

  const ademeComparator: RefObject<HTMLDivElement> | null = useRef(null);

  useEffect(() => {
    document.getElementById("datagir-impact-co2")?.remove();
    const script = document.createElement("script");
    script.id = "datagir-impact-co2";
    script.src = "https://impactco2.fr/iframe.js";
    script.dataset.type = type;
    script.dataset.search = "?theme=night";
    script.async = true;
    script.onload = () => {
      ademeComparator.current?.querySelector("div")?.remove();
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setShowComparator(true);
        }, 500);
      }, 500);
    };
    ademeComparator.current?.appendChild(script);
  }, []);

  return { ademeComparator, isLoading, showComparator };
};
