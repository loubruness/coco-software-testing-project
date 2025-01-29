import { chromium, expect } from "@playwright/test";

import { test } from "./fixtures";

test("Can promote as manager a manager", async () => {
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

  await page.getByText("Edit").nth(0).click();
  await page.getByText("Promote as manager").nth(0).click();
  await page.getByRole("button", { name: "Proceed" }).click();
  
  await page.getByText("Edit").nth(0).click();
  await page.getByText("Promote as manager").nth(0).click();
  
  //If the button should not be exist when the user is already a manager
  const button = await page.getByRole("button", { name: "Proceed" });
  expect(button).toBeNull();
  
  // If the button should be disabled when the user is already a manager
//   const isDisabled = button.getAttribute("disabled");
//   expect(isDisabled).toBe("true");
});
