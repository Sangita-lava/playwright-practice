
import { LoginPage } from '../pages/loginPage.js';
import { test, expect } from '@playwright/test';
import { readExcel } from '../helpers/excelReader.js';


test.describe('Login Tests - OrangeHRM', () => {
  let testData = [];

  test.beforeAll(async () => {
    testData = await readExcel('./data/testData.xlsx', 'Sheet1');
  });

  test('Run data-driven login tests', async ({ page }) => {
    for (const data of testData) {
      const loginPage = new LoginPage(page);
      await page.goto('/web/index.php/auth/login');
      await loginPage.login(data.username, data.password);

      // Optional: Check login success by URL or some element
      await expect(page).toHaveURL(/dashboard|pim|admin/);
    }
  });
});

