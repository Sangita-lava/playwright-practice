# Test info

- Name: Login and Create Admin User - OrangeHRM
- Location: C:\HP_Backup\Windows_Backup\D_drive\Softwares\Playwright\playwright-practice\tests\admin.create.spec.js:9:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('text=Successfully Saved')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=Successfully Saved')

    at C:\HP_Backup\Windows_Backup\D_drive\Softwares\Playwright\playwright-practice\tests\admin.create.spec.js:47:61
    at C:\HP_Backup\Windows_Backup\D_drive\Softwares\Playwright\playwright-practice\tests\admin.create.spec.js:13:5
```

# Page snapshot

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "Admin" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: Uday Mudduluru
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: User Management 
      - listitem: Job 
      - listitem: Organization 
      - listitem: Qualifications 
      - listitem:
        - link "Nationalities":
          - /url: "#"
      - listitem:
        - link "Corporate Branding":
          - /url: "#"
      - listitem: Configuration 
      - button ""
- heading "Add User" [level=6]
- separator
- text: User Role* Admin  Employee Name*
- textbox "Type for hints...": Sania Shaheen
- text: Invalid Status* Enabled  Username*
- textbox: user_1749619797515
- text: Weak Password*
- textbox: Pass1234@
- paragraph: For a strong password, please use a hard to guess combination of text with upper and lower case characters, symbols and numbers
- text: Confirm Password*
- textbox: Pass1234@
- separator
- paragraph: "* Required"
- button "Cancel"
- button "Save"
- paragraph: OrangeHRM OS 5.7
- paragraph:
  - text: © 2005 - 2025
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

# Test source

```ts
   1 |
   2 | const { test, expect } = require('@playwright/test');
   3 | const { LoginPage } = require('../pages/loginPage');
   4 | const { AdminPage } = require('../pages/admin-userPage');
   5 | const { readExcel } = require('../helpers/excelReader');
   6 |
   7 | let testData = [];
   8 |
   9 | test('Login and Create Admin User - OrangeHRM', async ({ page }) => {
  10 |   testData = await readExcel('./data/testData.xlsx', 'Sheet1');
  11 |
  12 |   for (const data of testData) {
  13 |     await test.step(`Login and create user with username: ${data.username}`, async () => {
  14 |       const loginPage = new LoginPage(page);
  15 |       const adminPage = new AdminPage(page);
  16 |
  17 |       // Step 1: Login
  18 |       await page.goto('/web/index.php/auth/login');
  19 |       await loginPage.login(data.username, data.password);
  20 |
  21 |       // Step 2: Wait for dashboard after login
  22 |       await page.waitForURL('**/dashboard/index', { timeout: 10000 });
  23 |       await expect(page).toHaveURL(/.*dashboard\/index/);
  24 |
  25 |       // Step 3: Click Admin menu in sidebar
  26 |       await adminPage.clickAdminMenu();
  27 |       await expect(page).toHaveURL(/.*viewSystemUsers/);
  28 |
  29 |       // Step 4: Click Add to open user creation page
  30 |       await adminPage.clickAddButton();
  31 |       await page.waitForURL('**/admin/saveSystemUser');
  32 |       await expect(page).toHaveURL(/.*saveSystemUser/);
  33 |
  34 |       // Step 5: Fill and Save new user
  35 |       await adminPage.fillUserDetails({
  36 |         role: 'Admin',
  37 |         status: 'Enabled',
  38 |         employeeName: 'Sania Shaheen',
  39 |         username: `user_${Date.now()}`,
  40 |         password: 'Pass1234@',
  41 |         confirmPassword: 'Pass1234@'
  42 |       });
  43 |
  44 |       await adminPage.saveUser();
  45 |
  46 |       // Step 6: Assert success (update as per actual success message or table record)
> 47 |       await expect(page.locator('text=Successfully Saved')).toBeVisible();
     |                                                             ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  48 |     });
  49 |   }
  50 | });
  51 |
```