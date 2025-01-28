import { test } from "./fixtures";
import { expect, chromium } from "@playwright/test";

test("has title", async () => {
  // TODO: remove 'slowMo' when done debugging
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Create a new team
  await page.goto("/add_team");
  const nameInput = page.locator('input[name="name"]');
  const teamName = "my team";
  await nameInput.fill(teamName);
  await page.click("text='Add'");

  // Check the team has been created
  await page.goto("/teams");
  const isVisible = await page.isVisible(`td:has-text('${teamName}')`);
  expect(isVisible).toBe(true);
});
