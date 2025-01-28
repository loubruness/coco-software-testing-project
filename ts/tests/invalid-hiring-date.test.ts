import { test } from "./fixtures";
import { expect, chromium } from "@playwright/test";

test("No check for the hiring date", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const currentDate = new Date().toISOString().split('T')[0];

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
  await page.getByPlaceholder("Hiring date").fill("5065-12-12");
  await page.getByPlaceholder("Job title").click();
  await page.getByPlaceholder("Job title").fill("job");
  await page.getByRole("button", { name: "Add" }).click();

  await page.goto("/employees");
  await page.getByText("Edit").nth(0).click();
  await page.getByText("Update contract").nth(0).click();

  const hiringDate = await page.getByPlaceholder("Hiring date").inputValue();
  
  expect(hiringDate > currentDate).toBe(false);
});
