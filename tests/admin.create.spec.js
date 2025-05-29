// admin.create.spec.js
const { test, expect } = require('@playwright/test');
const { AdminPage } = require('../pages/admin-userPage');
const{LoginPage} =require('../pages/loginPage');
import { readExcel } from '../helpers/excelReader.js';

let testData = [];
test.beforeAll(async () => {
    testData = await readExcel('./data/testData.xlsx', 'Sheet1');
  });


test('Create Admin User', async ({ page }) => {
    const adminPage = new AdminPage(page);
const loginPage = new LoginPage(page);
      await page.goto('/web/index.php/auth/login');
      await loginPage.login(testData.username, testData.password);

      // Optional: Check login success by URL or some element
      await expect(page).toHaveURL(/dashboard|pim|admin/);
await page.goto('web/index.php/admin/viewSystemUsers');

    // Wait for dashboard heading (or another reliable element)
await page.waitForSelector('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module');

    await adminPage.navigateToAdmin();
    await adminPage.clickAddButton();
    await adminPage.fillUserDetails({
        username: 'testuser1',
        password: 'Pass1234@',
        confirmPassword: 'Pass1234@',
    });
    await adminPage.saveUser();

    await expect(page.locator('text=testuser1')).toBeVisible();
});
