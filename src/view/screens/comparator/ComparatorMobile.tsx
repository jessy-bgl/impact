import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { useTheme } from "react-native-paper";
import WebView from "react-native-webview";
import { WebViewNavigationEvent } from "react-native-webview/lib/WebViewTypes";

import { AdemeComparatorType } from "@view/screens/comparator/Comparator";

type Props = {
  type: AdemeComparatorType;
};

export const ComparatorForMobile = ({ type }: Props) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <MotiView
          animate={{ backgroundColor: colors.surface }}
          style={{ paddingTop: 25, paddingLeft: 18, paddingRight: 18 }}
        >
          <Skeleton height="100%" width="100%" />
        </MotiView>
      )}

      <WebView
        style={{
          backgroundColor: colors.background,
          display: isLoading ? "none" : "flex",
        }}
        scalesPageToFit={false}
        showsVerticalScrollIndicator={false}
        // Remove the div that contains a link to the Impact CO2 website
        injectedJavaScript={`document.body.querySelector("div").remove();`}
        renderError={() => <div>Erreur</div>}
        onLoad={(_: WebViewNavigationEvent) => {
          setTimeout(() => setIsLoading(false), 1000);
        }}
        originWhitelist={["*"]}
        source={{
          html: `
          <!DOCTYPE html>
          <html>
            <body>
              <script name="impact-co2" src="https://impactco2.fr/iframe.js" data-type=${type} data-search="?theme=night"></script>
            </body>
          </html>
        `,
        }}
      />
    </>
  );
};
