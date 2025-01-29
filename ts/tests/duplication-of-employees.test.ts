import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { AddNewEmployeePage } from "../page-objects/AddNewEmployeePage";

test("Can add a duplicate employee", async ({ page }) => {
  // Setup
  const addEmployeePage = new AddNewEmployeePage(page);

  // Add first employee
  addEmployeePage.goto();

  addEmployeePage.fillName("test");
  addEmployeePage.fillEmail("test@test.com");
  addEmployeePage.fillAddressLine1("address");
  addEmployeePage.fillCity("city");
  addEmployeePage.fillZipCode("1234");
  addEmployeePage.fillHiringDate("2025-01-28");
  addEmployeePage.fillJobTitle("job");
  addEmployeePage.addEmployee();

  // Add second employee
  addEmployeePage.goto();

  addEmployeePage.fillName("test");
  addEmployeePage.fillEmail("test@test.com");
  addEmployeePage.fillAddressLine1("address");
  addEmployeePage.fillCity("city");
  addEmployeePage.fillZipCode("1234");
  addEmployeePage.fillHiringDate("2025-01-28");
  addEmployeePage.fillJobTitle("job");
  addEmployeePage.addEmployee();

  // Assert
  const locator = page.getByText("test@test.com");
  await expect(locator).toHaveCount(1);
});
