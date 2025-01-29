import { Locator, Page } from "@playwright/test";

export class AddNewEmployeePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly addressLine1Input: Locator;
  readonly addressLine2Input: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly hiringDateInput: Locator;
  readonly jobTitleInput: Locator;
  readonly addEmployeeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator("#id_name");
    this.emailInput = page.locator("#id_email");
    this.addressLine1Input = page.locator("#id_address_line1");
    this.addressLine2Input = page.locator("#id_address_line2");
    this.cityInput = page.locator("#id_city");
    this.zipCodeInput = page.locator("#id_zip_code");
    this.hiringDateInput = page.locator("#id_hiring_date");
    this.jobTitleInput = page.locator("#id_job_title");
    this.addEmployeeButton = page.locator("button", { hasText: "Add" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async fillName(value: string) {
    await this.nameInput.fill(value);
  }

  async fillEmail(value: string) {
    await this.emailInput.fill(value);
  }

  async fillAddressLine1(value: string) {
    await this.addressLine1Input.fill(value);
  }

  async fillAddressLine2(value: string) {
    await this.addressLine2Input.fill(value);
  }

  async fillCity(value: string) {
    await this.cityInput.fill(value);
  }

  async fillZipCode(value: string) {
    await this.zipCodeInput.fill(value);
  }

  async fillHiringDate(value: string) {
    await this.hiringDateInput.fill(value);
  }

  async fillJobTitle(value: string) {
    await this.jobTitleInput.fill(value);
  }

  async addEmployee() {
    await this.addEmployeeButton.click();
  }
}
