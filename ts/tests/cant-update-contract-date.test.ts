import { test } from "./fixtures";
import { expect, chromium } from "@playwright/test";

test("Can't update contract date (blocked interface)", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("/add_employee");
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

  await page.goto("/employees");
  await page.getByText("Edit").nth(0).click();
  await page.getByText("Update contract").nth(0).click();

  // Check if hiring date is readonly
  const isReadonly =
    (await page.getByPlaceholder("Hiring date").getAttribute("readonly")) !==
    null;
  expect(isReadonly).toBe(false);
});
