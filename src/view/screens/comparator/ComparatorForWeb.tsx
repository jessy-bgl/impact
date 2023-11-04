import { useEffect } from "react";

export const ComparatorForWeb = () => {
  useEffect(() => {
    const scriptContainer = document.createElement("div");
    const script = document.createElement("script");
    script.id = "datagir-impact-co2";
    script.src = "https://impactco2.fr/iframe.js";
    script.dataset.type = "convertisseur";
    script.dataset.search = "?theme=night";
    script.async = true;

    script.onload = () => {
      const uselessDivToRemvoe = document
        .getElementById("ademe-comparator")
        ?.querySelector("div")
        ?.querySelector("div");
      uselessDivToRemvoe?.remove();
    };

    scriptContainer.appendChild(script);
    const targetElement = document.getElementById("ademe-comparator");
    targetElement?.appendChild(scriptContainer);

    return () => {
      targetElement?.removeChild(scriptContainer);
    };
  }, []);

  return (
    <div style={{ overflow: "auto" }}>
      <div id="ademe-comparator" />
    </div>
  );
};
