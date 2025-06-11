const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { readExcel } = require('../helpers/excelReader');

let testData = [];

test.beforeAll(async () => {
  testData = await readExcel('./data/testData.xlsx', 'Sheet1');
});

test.describe('Login Tests - OrangeHRM', () => {
  for (const data of testData) {
    test(`Login with username: ${data.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await page.goto('/web/index.php/auth/login');
      await loginPage.login(data.username, data.password);

      // Wait for either successful navigation or capture URL
      await page.waitForURL('**/admin/viewSystemUsers', { timeout: 15000 });
      await expect(page).toHaveURL(/.*viewSystemUsers/);
    });
  }
});
