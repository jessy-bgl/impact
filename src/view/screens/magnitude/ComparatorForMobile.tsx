import WebView from "react-native-webview";

export const ComparatorForMobile = () => {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: `<iFrame src='<script id="datagir-impact-co2" src="https://impactco2.fr/iframe.js" data-type="convertisseur" data-search="?theme=night"></script>' />`,
      }}
    />
  );
};
