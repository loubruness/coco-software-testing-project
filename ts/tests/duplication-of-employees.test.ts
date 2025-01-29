import { test } from "./fixtures";
import { expect } from "@playwright/test";

test("Can add a duplicate employee", async ({ page }) => {
  await page.goto("https://c.se1.hr.dmerej.info/add_employee");
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("test");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test@test.com");
  await page.locator("#id_address_line1").click();
  await page.locator("#id_address_line1").fill("address");
  await page.getByPlaceholder("City").click();
  await page.getByPlaceholder("City").fill("city");
  await page.getByPlaceholder("Zip code").click();
  await page.getByPlaceholder("Zip code").fill("1234");
  await page.getByPlaceholder("Hiring date").fill("2025-01-28");
  await page.getByPlaceholder("Job title").click();
  await page.getByPlaceholder("Job title").fill("job");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "Add new employee" }).click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("test");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test@test.com");
  await page.locator("#id_address_line1").click();
  await page.locator("#id_address_line1").fill("address");
  await page.getByPlaceholder("City").click();
  await page.getByPlaceholder("City").fill("city");
  await page.getByPlaceholder("Zip code").click();
  await page.getByPlaceholder("Zip code").fill("1234");
  await page.getByPlaceholder("Hiring date").fill("2025-01-28");
  await page.getByPlaceholder("Job title").click();
  await page.getByPlaceholder("Job title").fill("job");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByRole("cell", { name: "test@test.com" }).nth(1).click();

  const locator = page.getByText("test@test.com");
  await expect(locator).toHaveCount(1);
});
