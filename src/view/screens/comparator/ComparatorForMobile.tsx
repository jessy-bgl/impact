import WebView from "react-native-webview";

import { AdemeComparatorType } from "@view/screens/comparator/Comparator";

type Props = {
  type: AdemeComparatorType;
};

export const ComparatorForMobile = ({ type }: Props) => {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: `<iFrame src='<script id="datagir-impact-co2" src="https://impactco2.fr/iframe.js" data-type="${type}" data-search="?theme=night"></script>' />`,
      }}
    />
  );
};
