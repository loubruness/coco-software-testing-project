import { test } from "./fixtures";
import { expect } from "@playwright/test";

test("create employee with zip negative", async ({ page }) => {
  await page.goto('https://c.se1.hr.dmerej.info/add_employee');
  await page.getByPlaceholder('Zip code').fill('-12345');
  const locator = page.getByPlaceholder('Zip code');
  await expect(locator).toHaveAttribute('aria-invalid', 'true');
});

test("create employee with zip too long", async ({ page }) => {
  await page.goto('https://c.se1.hr.dmerej.info/add_employee');
  await page.getByPlaceholder('Zip code').fill('10000000');
  const locator = page.getByPlaceholder('Zip code');
  await expect(locator).toHaveAttribute('aria-invalid', 'true');
});

test("update with bad zip", async ({ page }) => {
  const zipCode = '10000000';
  await page.goto("https://c.se1.hr.dmerej.info/add_employee");
  await page.getByPlaceholder("Name").fill("test");
  await page.getByPlaceholder("Email").fill("test@test.com");
  await page.locator("#id_address_line1").fill("address");
  await page.getByPlaceholder("City").fill("city");
  await page.getByPlaceholder("Zip code").fill("12345");
  await page.getByPlaceholder("Hiring date").fill("2025-01-28");
  await page.getByPlaceholder("Job title").fill("job");
  await page.getByRole("button", { name: "Add" }).click();

  await page.goto("https://c.se1.hr.dmerej.info/employees");
  await page.getByRole('link', { name: 'Edit' }).first().click();
  await page.getByRole('link', { name: 'Update address' }).click();
  await page.getByPlaceholder('Zip code').fill(zipCode);
  const locator = page.getByPlaceholder('Zip code');
  await expect(locator).toHaveAttribute('aria-invalid', 'true');
});