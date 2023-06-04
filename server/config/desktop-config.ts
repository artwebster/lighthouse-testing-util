import * as constants from './constants.js';
 
 const config = {
   extends: 'lighthouse:default',
   settings: {
     formFactor: 'desktop',
     throttling: constants.throttling.desktopDense4G,
     screenEmulation: constants.screenEmulationMetrics.desktop,
     emulatedUserAgent: constants.userAgents.desktop,
   },
 };
 
 export default config;