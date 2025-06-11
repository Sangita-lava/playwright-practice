// In admin-userPage.js
class AdminPage {
    constructor(page) {
        this.page = page;
        this.adminMenu = page.locator('a[href*="admin"]'); // Sidebar Admin link
        this.addButton = page.getByRole('button', { name: 'Add' });

        this.roleDropdown = page.locator('.oxd-select-text').nth(0);
        this.statusDropdown = page.locator('.oxd-select-text').nth(1);
        this.employeeNameField = page.getByPlaceholder('Type for hints...');
        this.usernameField = page.locator('input[name="username"]');
        this.passwordField = page.locator('input.oxd-input').nth(2); // third input
        this.confirmPasswordField = page.locator('input.oxd-input').nth(3); // fourth input

        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async clickAdminMenu() {
        await this.adminMenu.click();
        await this.page.waitForURL('**/admin/viewSystemUsers');
    }

    async clickAddButton() {
        await this.addButton.click();
        this.usernameField = this.page.locator('input.oxd-input').nth(1); // or better use a label/aria selector if possible

    }

    async fillUserDetails({ role, status, employeeName, username, password, confirmPassword }) {
        await this.roleDropdown.click();
        await this.page.getByRole('option', { name: role }).click();

        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: status }).click();

        await this.employeeNameField.fill(employeeName);
        await this.page.waitForSelector('.oxd-autocomplete-dropdown div', { timeout: 5000 });
        await this.page.locator('.oxd-autocomplete-dropdown div').first().click();


        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(confirmPassword);
    }

    async saveUser() {
        await this.saveButton.click();
    }
}

module.exports = { AdminPage };
