import { Locator, Page } from "@playwright/test";

export class EmployeesPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly employeesTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator("a", { hasText: "Home" });
    this.employeesTable = page
      .locator("table > tbody", { hasText: "Employees" })
      .nth(0);
  }

  async goto() {
    await this.page.goto("/");
  }

  async getNthEmployee(n: number) {
    return this.employeesTable.locator("tr").nth(n);
  }

  async getListOfEmployees() {
    const employees = this.employeesTable.locator("tr");
    const count = await employees.count();
    let employeeData: { name: string | null; email: string | null }[] = [];
    for (let i = 0; i < count; i++) {
      employeeData.push({
        name: await employees.nth(i).locator("td").nth(0).textContent(),
        email: await employees.nth(i).locator("td").nth(1).textContent(),
      });
    }
    return employeeData;
  }

  async editNthEmployee(n: number) {
    await (await this.getNthEmployee(n))
      .locator("button", { hasText: "Edit" })
      .click();
  }

  async deleteNthEmployee(n: number) {
    await (await this.getNthEmployee(n))
      .locator("button", { hasText: "Delete" })
      .click();
  }
}
