import { test as base, expect } from "@playwright/test";

export const test = base;
test.beforeEach(async ({ page }) => {
  await page.goto("/reset_db");
  await page.click("button:has-text('proceed')");
});

export { expect };
