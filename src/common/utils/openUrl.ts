import * as WebBrowser from "expo-web-browser";
import { Linking } from "react-native";

const WEB_URL = /^https?:\/\//i;

/**
 * Opens web pages in the in-app browser so the user stays in the app, and
 * hands any other scheme (mailto:, tel:, ...) to the OS.
 */
export const openUrl = async (url: string) => {
  try {
    if (WEB_URL.test(url)) await WebBrowser.openBrowserAsync(url);
    else await Linking.openURL(url);
  } catch (error) {
    console.error("Error opening URL:", error);
  }
};
