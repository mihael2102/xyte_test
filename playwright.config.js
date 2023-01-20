const moment = require("moment");
const config = {
  use: {
    baseURL: 'https://michael-faxes.on-xyte.com',
    browserName: "chromium",
    headless: false,
    viewport: { width: 1728, height: 1117 },
    launchOptions: {
      slowMo: 50,
      logger: {
        isEnabled: (name, severity) => true,
        log: (name, severity, message, args) => console.log(`${moment().format('hh:mm:ss A')} ${name} ${message}`),
      },
    },
    screenshot: "only-on-failure",
    // video: 'on',
    // trace: 'on',
  },
  testDir: "tests",
  timeout: 60000,
  workers: 1,
  reporter: [
	  ["html", { open: "always" }],
  ],
  retries: 0,
};

module.exports = config;