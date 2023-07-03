import * as constants from "./constants.js";

const desktopConfig = {
  extends: "lighthouse:default",
  settings: {
    formFactor: "desktop" as const,
    throttling: constants.throttling.desktopDense4G,
    screenEmulation: constants.screenEmulationMetrics.desktop,
    emulatedUserAgent: constants.userAgents.desktop,
  },
};

export default desktopConfig;
