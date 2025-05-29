class AdminPage {
  constructor(page) {
    this.page = page;
    this.adminMenu = page.locator('a[href*="admin"]');
    this.addButton = page.locator('button:has-text("Add")');
    this.usernameField = page.locator('input[placeholder="Username"]');
    this.passwordField = page.locator('input[placeholder="Password"]');
    this.confirmPasswordField = page.locator('input[placeholder="Confirm Password"]');
    this.saveButton = page.locator('button:has-text("Save")');
  }

  async navigateToAdmin() {
    await this.adminMenu.click();
    await this.page.waitForURL('**/admin/viewSystemUsers');
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async fillUserDetails({ username, password, confirmPassword }) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(confirmPassword);
  }

  async saveUser() {
    await this.saveButton.click();
  }
}

module.exports = { AdminPage };
