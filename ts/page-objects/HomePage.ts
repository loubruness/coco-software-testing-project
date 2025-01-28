import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly listEmployeesLink: Locator;
  readonly addEmployeeLink: Locator;
  readonly listTeamsLink: Locator;
  readonly createTeamLink: Locator;
  readonly resetDatabaseLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.listEmployeesLink = page.locator("a", { hasText: "List employees" });
    this.addEmployeeLink = page.locator("a", { hasText: "Add new employee" });
    this.listTeamsLink = page.locator("a", { hasText: "List teams" });
    this.createTeamLink = page.locator("a", { hasText: "Create new team" });
    this.resetDatabaseLink = page.locator("a", { hasText: "Reset database" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async listEmployees() {
    await this.listEmployeesLink.first().click();
  }

  async addEmployee() {
    await this.addEmployeeLink.first().click();
  }

  async listTeams() {
    await this.listTeamsLink.first().click();
  }

  async createTeam() {
    await this.createTeamLink.first().click();
  }

  async resetDatabase() {
    await this.resetDatabaseLink.first().click();
  }
}
