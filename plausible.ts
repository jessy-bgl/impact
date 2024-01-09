import Plausible from "plausible-tracker";

export const plausible = Plausible({
  domain: "jessy-bgl.github.io",
  apiHost: "https://jydom.myqnapcloud.com:8001",
  trackLocalhost: false,
  hashMode: true,
});

plausible.enableAutoPageviews();
plausible.enableAutoOutboundTracking();
