
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { AdminPage } = require('../pages/admin-userPage');
const { readExcel } = require('../helpers/excelReader');

let testData = [];

test('Login and Create Admin User - OrangeHRM', async ({ page }) => {
  testData = await readExcel('./data/testData.xlsx', 'Sheet1');

  for (const data of testData) {
    await test.step(`Login and create user with username: ${data.username}`, async () => {
      const loginPage = new LoginPage(page);
      const adminPage = new AdminPage(page);

      // Step 1: Login
      await page.goto('/web/index.php/auth/login');
      await loginPage.login(data.username, data.password);

      // Step 2: Wait for dashboard after login
      await page.waitForURL('**/dashboard/index', { timeout: 10000 });
      await expect(page).toHaveURL(/.*dashboard\/index/);

      // Step 3: Click Admin menu in sidebar
      await adminPage.clickAdminMenu();
      await expect(page).toHaveURL(/.*viewSystemUsers/);

      // Step 4: Click Add to open user creation page
      await adminPage.clickAddButton();
      await page.waitForURL('**/admin/saveSystemUser');
      await expect(page).toHaveURL(/.*saveSystemUser/);

      // Step 5: Fill and Save new user
      await adminPage.fillUserDetails({
        role: 'Admin',
        status: 'Enabled',
        employeeName: 'Sania Shaheen',
        username: `user_${Date.now()}`,
        password: 'Pass1234@',
        confirmPassword: 'Pass1234@'
      });

      await adminPage.saveUser();

      // Step 6: Assert success (update as per actual success message or table record)
      await expect(page.locator('text=Successfully Saved')).toBeVisible();
    });
  }
});
