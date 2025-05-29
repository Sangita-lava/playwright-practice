const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    storageState: 'storage/login.json', // ✅ Login state reused
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  testDir: 'tests',
  
  // ✅ Add this reporter section:
  reporter: [['html', { open: 'always' },["allure-playwright"]]], // or 'always' if you prefer
   // Save login session to file
   globalSetup: require.resolve('./hooks/globalHooks.js')
  
  
});
