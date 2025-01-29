import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { AddNewEmployeePage } from "../page-objects/AddNewEmployeePage";
import { EmployeesPage } from "../page-objects/EmployeesPage";
import User from "../User";

test("Can add a duplicate employee", async ({ page }) => {
  // Setup
  const addEmployeePage = new AddNewEmployeePage(page);

  const user = new User(
    "test",
    "test@test.com",
    { line1: "address", line2: "" },
    "city",
    1234,
    "2025-01-28",
    "job title"
  );

  // Add first employee
  addEmployeePage.goto();
  addEmployeePage.fillForm(user);
  addEmployeePage.addEmployee();

  // Add second employee
  addEmployeePage.goto();
  addEmployeePage.fillForm(user);
  addEmployeePage.addEmployee();

  // Assert
  const employeesPage = new EmployeesPage(page);
  await expect(employeesPage.getListOfEmployees.length).toBe(1);
});
